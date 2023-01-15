import CurrentSituation from '@components/dashboard/current_situation';
import TrendStatistics from '@components/dashboard/trend_statistics';
import TypeStatistics from '@components/dashboard/type_statistics';
import wrapper from '@redux/store';
import { checkToken } from '@utils/check_token';
import { setPageState, setUserState } from '@utils/set_initial_state';

const DashboardPage = () => {
  return (
    <>
      <CurrentSituation />
      <TypeStatistics />
      <TrendStatistics />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 토큰 확인 (미보유시 로그인 페이지 이동)
  const redirect = checkToken(context);
  if (redirect) { return redirect; }

  // 페이지 초기 설정 (페이지 상태, 토큰값)
  setPageState(store, context, 'dashboard');
  setUserState(store, context);

  return {
    props: {}
  };
});

export default DashboardPage;