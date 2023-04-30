import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { readArticles } from '@api/dummy/article';
import ArticleManagement from '@components/article/management';
import { setTokenExpiration, setPageState, setUserState, getToken, redirectPage } from '@hooks/use_server_side';
import { useUserState } from '@hooks/use_user_state';
import { reissueToken } from '@redux/actions/user';
import { setArticles } from '@redux/reducers/article';
import wrapper from '@redux/store';

const ArticlePage = () => {
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

  return (<ArticleManagement />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 페이지 상태 설정
  setPageState(store, context, 'article', 10);

  // 유저 상태 설정
  const token = getToken(context);
  if (!token) { return redirectPage('/'); }  // 토큰이 없는 경우 로그인 페이지로 이동
  setUserState(store, token);

  // 데이터 요청 및 저장
  const result = await readArticles(store.getState().page);
  if (typeof result !== 'string') {
    store.dispatch(setArticles(result));
  } else if (result === 'Token Exception') {
    setTokenExpiration(store);
  }

  return { props: {} };
});

export default ArticlePage;