import Cookies from 'js-cookie';

import { readReports } from '@api/dummy/report';
import Management from '@components/report/management';
import { setPage } from '@redux/reducers/page';
import { setReports } from '@redux/reducers/report';
import { setLoginUser } from '@redux/reducers/user';
import wrapper from '@redux/store';
import { PagePropsType } from '@types';
import { redirectLoginPage, reissueToken } from '@utils/reissue_token';

const ReportPage = ({ refreshToken }: PagePropsType) => {
  Cookies.set('refreshToken', refreshToken);

  return (<Management />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 토큰 재발행 (재발행 실패시 로그인 페이지로 이동)
  const token = await reissueToken(context);
  if (!token) { return redirectLoginPage(); }

  // 페이지 상태 적용
  store.dispatch(setLoginUser(token));
  store.dispatch(setPage({
    section: 'report',
    page: context.query.page ? Number(context.query.page) : 1,
    row: 10,
    search: context.query.search ? context.query.search : null,
    status: context.query.status ? context.query.status : null
  }));

  // 필요한 데이터 요청 후 저장
  const response = await readReports(store.getState().page);
  if (response !== null && typeof response === 'object' && 'reports' in response && 'reportsLength' in response) {
    store.dispatch(setReports(response));
  }

  // 재발행 refreshToken 전달
  return {
    props: {
      refreshToken: token.refreshToken
    }
  };
});

export default ReportPage;