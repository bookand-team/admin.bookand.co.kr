import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Login from '@components/login';
import { useUserState } from '@hooks/use_user_state';
import { silentLogin } from '@redux/actions/user';
import wrapper from '@redux/store';
import { checkToken } from '@utils/check_token';
import { setPageState, setTokenExpiration, setUserState } from '@utils/set_initial_state';

const LoginPage = () => {
  const router = useRouter();
  const [user, dispatch] = useUserState();

  // 페이지가 호출될 때 만료된 AccessToken을 가진 경우 토큰 재발행 요청
  useEffect(() => {
    if (user.token && user.expired) { dispatch(silentLogin({ refreshToken: user.token.refreshToken })); }
  }, []);

  // 토큰 재발행 요청 결과 처리
  useEffect(() => {
    if (user.silentLoginDone) { router.replace('/dashboard'); }
  }, [user.silentLoginDone]);

  return (<Login />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 토큰 확인 (보유시 토큰 재발행 요청)
  if (checkToken(context)) {
    setUserState(store, context, true);
    setTokenExpiration(store);
  }

  // 페이지 초기 설정 (페이지 상태)
  setPageState(store, context, 'login');

  return { props: {} };
});

export default LoginPage;