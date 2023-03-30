import { useRouter } from 'next/router';
import { useEffect } from 'react';

import CurrentSituation from '@components/dashboard/current_situation';
// import TypeStatistics from '@components/dashboard/type_statistics';
import { useUserState } from '@hooks/use_user_state';
import { silentLogin } from '@redux/actions/user';
import wrapper from '@redux/store';
import { checkToken } from '@utils/check_token';
import { redirectPage } from '@utils/redirect_page';
import { setPageState, setUserState } from '@utils/set_initial_state';

const DashboardPage = () => {
  const router = useRouter();
  const [user, dispatch] = useUserState();

  // 페이지가 호출될 때 만료된 AccessToken을 가진 경우 토큰 재발행 요청
  useEffect(() => {
    if (user.token && user.expired) { dispatch(silentLogin({ refreshToken: user.token.refreshToken })); }
  }, []);

  // 토큰 재발행 요청 결과 처리
  useEffect(() => {
    if (user.silentLoginDone) { router.reload(); }
    if (user.silentLoginError) { router.replace('/'); }
  }, [user.silentLoginDone, user.silentLoginError]);

  return (
    <>
      <CurrentSituation />
      {/* <TypeStatistics /> */}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 토큰 확인 (미보유시 로그인 페이지 이동)
  if (!checkToken(context)) { return redirectPage('/'); }

  // 페이지 초기 설정 (페이지 상태, 토큰값)
  setPageState(store, context, 'dashboard');
  setUserState(store, context);

  return { props: {} };
});

export default DashboardPage;