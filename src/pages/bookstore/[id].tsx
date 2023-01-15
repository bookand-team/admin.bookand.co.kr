import { readBookstore } from '@api/dummy/bookstore';
import Modification from '@components/bookstore/modification';
import { setBookstore } from '@redux/reducers/bookstore';
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
  setPageState(store, context, 'bookstore');
  setUserState(store, context);

  // 데이터 요청 및 저장
  const response = await readBookstore({ id: context.params?.id as string });
  if (response !== null && typeof response === 'object' && 'bookstore' in response) {
    store.dispatch(setBookstore(response));
  }

  return {
    props: {}
  };
});

export default ModificationPage;