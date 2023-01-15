import { readFeedbacks } from '@api/dummy/feedback';
import Management from '@components/feedback/management';
import { setFeedbacks } from '@redux/reducers/feedback';
import wrapper from '@redux/store';
import { checkToken } from '@utils/check_token';
import { setPageState, setUserState } from '@utils/set_initial_state';

const FeedbackPage = () => {
  return (<Management />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 토큰 확인 (미보유시 로그인 페이지 이동)
  const redirect = checkToken(context);
  if (redirect) { return redirect; }

  // 페이지 초기 설정 (페이지 상태, 토큰값)
  setPageState(store, context, 'feedback', 10);
  setUserState(store, context);

  // 데이터 요청 및 저장
  const response = await readFeedbacks(store.getState().page);
  if (response !== null && typeof response === 'object' && 'feedbacks' in response && 'feedbacksLength' in response) {
    store.dispatch(setFeedbacks(response));
  }

  return {
    props: {}
  };
});

export default FeedbackPage;