import Cookies from 'js-cookie';

import CurrentSituation from '@components/dashboard/current_situation';
import TrendStatistics from '@components/dashboard/trend_statistics';
import TypeStatistics from '@components/dashboard/type_statistics';
import { setPage } from '@redux/reducers/page';
import { setLoginUser } from '@redux/reducers/user';
import wrapper from '@redux/store';
import { PagePropsType } from '@types';
import { redirectLoginPage, reissueToken } from '@utils/reissue_token';

const DashboardPage = ({ refreshToken }: PagePropsType) => {
  Cookies.set('refreshToken', refreshToken);

  return (
    <>
      <CurrentSituation />
      <TypeStatistics />
      <TrendStatistics />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 토큰 재발행 (재발행 실패시 로그인 페이지로 이동)
  const token = await reissueToken(context);
  if (!token) { return redirectLoginPage(); }

  // 페이지 상태 적용
  store.dispatch(setLoginUser(token));
  store.dispatch(setPage({
    section: 'dashboard'
  }));

  // TODO: 페이지 상태에 따라 필요한 데이터 요청

  // 재발행 refreshToken 전달
  return {
    props: {
      refreshToken: token.refreshToken
    }
  };
});

export default DashboardPage;