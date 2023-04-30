import { getToken, setPageState, setUserState, redirectPage } from '@hooks/use_server_side';
import wrapper from '@redux/store';

const NoticePage = () => {
  return (<>Notice</>);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 페이지 상태 설정
  setPageState(store, context, 'notice', 10);

  // 유저 상태 설정
  const token = getToken(context);
  if (!token) { return redirectPage('/'); }  // 토큰이 없는 경우 로그인 페이지로 이동
  setUserState(store, token);

  return { props: {} };
});

export default NoticePage;