import { readReports } from '@api/dummy/report';
import Management from '@components/report/management';
import { setReports } from '@redux/reducers/report';
import wrapper from '@redux/store';
import { checkToken } from '@utils/check_token';
import { setPageState, setUserState } from '@utils/set_initial_state';

const ReportPage = () => {
  return (<Management />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 토큰 확인 (미보유시 로그인 페이지 이동)
  const redirect = checkToken(context);
  if (redirect) { return redirect; }

  // 페이지 초기 설정 (페이지 상태, 토큰값)
  setPageState(store, context, 'report', 10);
  setUserState(store, context);

  // 데이터 요청 및 저장
  const response = await readReports(store.getState().page);
  if (response !== null && typeof response === 'object' && 'reports' in response && 'reportsLength' in response) {
    store.dispatch(setReports(response));
  }

  return {
    props: {}
  };
});

export default ReportPage;