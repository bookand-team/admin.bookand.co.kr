import Cookies from 'js-cookie';

import { redirectLoginPage, silentLogin } from '@api/user/silent_login';
import CurrentSituation from '@components/dashboard/current_situation';
import TrendStatistics from '@components/dashboard/trend_statistics';
import TypeStatistics from '@components/dashboard/type_statistics';
import { setPage } from '@redux/reducers/page';
import { setLoginUser } from '@redux/reducers/user';
import wrapper from '@redux/store';
import { PagePropsType } from '@types';

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