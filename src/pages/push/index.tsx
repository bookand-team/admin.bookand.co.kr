import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { readPushes } from '@api/dummy/push';
import Management from '@components/push/management';
import { useUserState } from '@hooks/use_user_state';
import { silentLogin } from '@redux/actions/user';
import { setPushes } from '@redux/reducers/push';
import wrapper from '@redux/store';
import { checkToken } from '@utils/check_token';
import { redirectPage } from '@utils/redirect_page';
import { setPageState, setTokenExpiration, setUserState } from '@utils/set_initial_state';

const PushPage = () => {
  const router = useRouter();
  const [user, dispatch] = useUserState();

  // 페이지가 호출될 때 만료된 AccessToken을 가진 경우 토큰 재발행 요청
  useEffect(() => {
    if (user.expired) { dispatch(silentLogin({ refreshToken: user.token!.refreshToken })); }
  }, []);

  // 토큰 재발행 요청 결과 처리
  useEffect(() => {
    if (user.silentLoginDone) { router.reload(); }
    if (user.silentLoginError) { router.replace('/'); }
  }, [user.silentLoginDone, user.silentLoginError]);

  return (<Management />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 토큰 확인 (미보유시 로그인 페이지 이동)
  if (!checkToken(context)) { return redirectPage('/'); }

  // 페이지 초기 설정 (페이지 상태, 토큰값)
  setPageState(store, context, 'push', 10);
  setUserState(store, context);

  // 데이터 요청 및 저장
  const result = await readPushes(store.getState().page);
  if (typeof result !== 'string') {
    store.dispatch(setPushes(result));
  } else if (result === 'Token Exception') {
    setTokenExpiration(store);
  }

  return { props: {} };
});

export default PushPage;