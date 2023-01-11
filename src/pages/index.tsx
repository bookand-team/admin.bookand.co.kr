import Cookies from 'js-cookie';
import { useEffect } from 'react';

import Login from '@components/login';
import { refreshLogin } from '@redux/actions/user';
import { setPage } from '@redux/reducers/page';
import wrapper from '@redux/store';
import { isLoginSucRes } from '@types';

const LoginPage = () => {
  useEffect(() => {
    Cookies.remove('refreshToken');
  }, []);

  return (<Login />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // refreshToken이 있는 경우
  if (context.req.cookies && 'refreshToken' in context.req.cookies) {
    // 로그인 상태 확인
    await store.dispatch(refreshLogin({ refreshToken: context.req.cookies['refreshToken'] as string }));
    // refreshToken이 만료되지 않은 경우
    if (isLoginSucRes(store.getState().user.refreshLoginDone)) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: true
        }
      };
    }
  }

  // 페이지 상태 적용
  store.dispatch(setPage({
    section: 'login'
  }));

  return {
    props: {}
  };
});

export default LoginPage;