import { readPush } from '@api/dummy/push';
import Modification from '@components/push/modification';
import { setPush } from '@redux/reducers/push';
import wrapper from '@redux/store';
import { checkToken } from '@utils/check_token';
import { setPageState, setUserState } from '@utils/set_initial_state';

const ModificationPage = () => {
  return (<Modification />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 토큰 확인 (미보유시 로그인 페이지 이동)
  const redirect = checkToken(context);
  if (redirect) { return redirect; }

  // 페이지 초기 설정 (페이지 상태, 토큰값)
  setPageState(store, context, 'push');
  setUserState(store, context);

  // 데이터 요청 및 저장
  const response = await readPush({ id: context.params?.id as string });
  if (response !== null && typeof response === 'object' && 'push' in response) {
    store.dispatch(setPush(response));
  }

  return {
    props: {}
  };
});

export default ModificationPage;