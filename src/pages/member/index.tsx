import { readMembers } from '@api/dummy/member';
import Management from '@components/member/management';
import { setMembers } from '@redux/reducers/member';
import wrapper from '@redux/store';
import { checkToken } from '@utils/check_token';
import { setPageState, setUserState } from '@utils/set_initial_state';

const MemberPage = () => {
  return (<Management />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 토큰 확인 (미보유시 로그인 페이지 이동)
  const redirect = checkToken(context);
  if (redirect) { return redirect; }

  // 페이지 초기 설정 (페이지 상태, 토큰값)
  setPageState(store, context, 'member', 10);
  setUserState(store, context);

  // 데이터 요청 및 저장
  const response = await readMembers(store.getState().page);
  if (response !== null && typeof response === 'object' && 'members' in response && 'membersLength' in response) {
    store.dispatch(setMembers(response));
  }

  return {
    props: {}
  };
});

export default MemberPage;