import Management from '../../components/feedback/management';
import Main from '../../components/main';
import { loadDummyFeedbacks } from '../../redux/reducers/feedbacks';
import { setPage } from '../../redux/reducers/page';
import wrapper from '../../redux/store';

const FeedbackPage = () => {
  return (
    <Main>
      <Management />
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch(setPage({
    section: 'feedback',
    category: context.query.category ? context.query.category : null,
    page: context.query.page ? Number(context.query.page) : 1,
    row: 10,
    search: context.query.search ? context.query.search : null,
  }));

  store.dispatch(loadDummyFeedbacks(store.getState().page));

  return {
    props: {},
  };
});

export default FeedbackPage;