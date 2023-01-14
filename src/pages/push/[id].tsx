import Cookies from 'js-cookie';

import { readPush } from '@api/dummy/push';
import Modification from '@components/push/modification';
import { setPage } from '@redux/reducers/page';
import { setPush } from '@redux/reducers/push';
import { setLoginUser } from '@redux/reducers/user';
import wrapper from '@redux/store';
import { PagePropsType } from '@types';
import { redirectLoginPage, reissueToken } from '@utils/reissue_token';

const ModificationPage = ({ refreshToken }: PagePropsType) => {
  Cookies.set('refreshToken', refreshToken);

  return (<Modification />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 토큰 재발행 (재발행 실패시 로그인 페이지로 이동)
  const token = await reissueToken(context);
  if (!token) { return redirectLoginPage(); }

  // 페이지 상태 적용
  store.dispatch(setLoginUser(token));
  store.dispatch(setPage({
    section: 'push'
  }));

  // 필요한 데이터 요청 후 저장
  const response = await readPush({ id: context.params?.id as string });
  if (response !== null && typeof response === 'object' && 'push' in response) {
    store.dispatch(setPush(response));
  }

  // 재발행 refreshToken 전달
  return {
    props: {
      refreshToken: token.refreshToken
    }
  };
});

export default ModificationPage;