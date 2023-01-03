import Main from '../../components/main';
import Management from '../../components/push/management';
import { setPage } from '../../redux/reducers/page';
import { loadDummyPushes } from '../../redux/reducers/pushes';
import wrapper from '../../redux/store';

const PushPage = () => {
  return (
    <Main>
      <Management />
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch(setPage({
    section: 'push',
    category: context.query.category ? context.query.category : null,
    page: context.query.page ? Number(context.query.page) : 1,
    row: 10,
    search: context.query.search ? context.query.search : null,
    status: context.query.status ? context.query.status : null
  }));

  store.dispatch(loadDummyPushes(store.getState().page));

  return {
    props: {}
  };
});

export default PushPage;