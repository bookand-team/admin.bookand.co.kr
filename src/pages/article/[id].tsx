import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { readArticle } from '@api/dummy/article';
import ArticleModification from '@components/article/modification';
import { getToken, setPageState, setTokenExpiration, setUserState, redirectPage } from '@hooks/use_server_side';
import { useUserState } from '@hooks/use_user_state';
import { reissueToken } from '@redux/actions/user';
import { setArticle } from '@redux/reducers/article';
import wrapper from '@redux/store';

const ArticleModificationPage = () => {
  const router = useRouter();
  const [user, dispatch] = useUserState();

  // 페이지가 호출될 때 만료된 AccessToken을 가진 경우 토큰 재발행 요청
  useEffect(() => {
    if (user.token && user.expired) { dispatch(reissueToken({ refreshToken: user.token.refreshToken })); }
  }, []);

  // 토큰 재발행 요청 결과 처리
  useEffect(() => {
    if (user.reissueTokenDone) { router.reload(); }
    if (user.reissueTokenError) { router.replace('/'); }
  }, [user.reissueTokenDone, user.reissueTokenError]);

  return (<ArticleModification />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 페이지 상태 설정
  setPageState(store, context, 'article');

  // 유저 상태 설정
  const token = getToken(context);
  if (!token) { return redirectPage('/'); }  // 토큰이 없는 경우 로그인 페이지로 이동
  setUserState(store, token);

  // 데이터 요청 및 저장
  const result = await readArticle({ id: context.params?.id as string });
  if (typeof result !== 'string') {
    store.dispatch(setArticle(result));
  } else if (result === 'Token Exception') {
    setTokenExpiration(store);
  }

  return { props: {} };
});

export default ArticleModificationPage;