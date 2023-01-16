import Registration from '@components/article/registration';
import wrapper from '@redux/store';
import { checkToken } from '@utils/check_token';
import { redirectPage } from '@utils/redirect_page';
import { setPageState, setUserState } from '@utils/set_initial_state';

const RegistrationPage = () => {
  return (<Registration />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 토큰 확인 (미보유시 로그인 페이지 이동)
  if (!checkToken(context)) { return redirectPage('/'); }

  // 페이지 초기 설정 (페이지 상태, 토큰값)
  setPageState(store, context, 'article');
  setUserState(store, context);

  return { props: {} };
});

export default RegistrationPage;