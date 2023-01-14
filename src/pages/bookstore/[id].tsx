import Cookies from 'js-cookie';

import { readBookstore } from '@api/dummy/bookstore';
import { redirectLoginPage, silentLogin } from '@api/user/silent_login';
import Modification from '@components/bookstore/modification';
import { setBookstore } from '@redux/reducers/bookstore';
import { setPage } from '@redux/reducers/page';
import { setLoginUser } from '@redux/reducers/user';
import wrapper from '@redux/store';
import { PagePropsType } from '@types';

const ModificationPage = ({ refreshToken }: PagePropsType) => {
  Cookies.set('refreshToken', refreshToken);

  return (<Modification />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 쿠키에 refreshToken이 없는 경우 로그인 페이지로 이동
  if (!context.req.cookies['refreshToken']) {
    return redirectLoginPage();
  }

  // 토큰 재발행 요청
  const token = await silentLogin({ refreshToken: context.req.cookies['refreshToken'] });

  // 쿠키의 refreshToken이 유효한 토큰이 아닌 경우 로그인 페이지로 이동
  if (!token) {
    return redirectLoginPage();
  }

  // 페이지 상태 적용
  store.dispatch(setLoginUser(token.accessToken));
  store.dispatch(setPage({
    section: 'bookstore'
  }));

  // 필요한 데이터 요청 후 저장
  const response = await readBookstore({ id: context.params?.id as string });
  if (response !== null && typeof response === 'object' && 'bookstore' in response) {
    store.dispatch(setBookstore(response));
  }

  // 재발행 refreshToken 전달
  return {
    props: {
      refreshToken: token.refreshToken
    }
  };
});

export default ModificationPage;