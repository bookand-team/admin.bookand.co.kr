import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Login from '@components/login';
import { getToken, setPageState, setUserState } from '@hooks/use_server_side';
import { useUserState } from '@hooks/use_user_state';
import { reissueToken } from '@redux/actions/user';
import wrapper from '@redux/store';

const LoginPage = () => {
  const router = useRouter();
  const [user, dispatch] = useUserState();

  // 페이지가 호출될 때 만료된 AccessToken을 가진 경우 토큰 재발행 요청
  useEffect(() => {
    if (user.token && user.expired) { dispatch(reissueToken({ refreshToken: user.token.refreshToken })); }
  }, []);

  // 토큰 재발행 요청 결과 처리
  useEffect(() => {
    if (user.reissueTokenDone) { router.replace('/dashboard'); }
  }, [user.reissueTokenDone]);

  return (<Login />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 페이지 상태 설정
  setPageState(store, context, 'login');

  // 유저 상태 설정
  const token = getToken(context);
  setUserState(store, token, false, token ? true : false);

  return { props: {} };
});

export default LoginPage;