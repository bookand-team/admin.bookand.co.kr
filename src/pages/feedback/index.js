import Management from '../../components/feedback/management';
import Main from '../../components/main';
import { setPage } from '../../redux/reducers/page';
import wrapper from '../../redux/store';

const Feedback = () => {
  return (
    <Main>
      <Management />
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch(setPage({
    section: 'feedback',
    search: context.query.search ? context.query.search : null,
    page: context.query.page ? Number(context.query.page) : null,
  }));

  return {
    props: {},
  };
});

export default Feedback;