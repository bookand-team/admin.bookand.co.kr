import Main from '../../components/main';
import Management from '../../components/push/management';
import Registration from '../../components/push/registration';
import { setPage } from '../../redux/reducers/page';
import { loadDummyPushes } from '../../redux/reducers/pushes';
import wrapper from '../../redux/store';

const Push = () => {
  return (
    <Main>
      <Management />
      <Registration />
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch(setPage({
    section: 'push',
    search: context.query.search ? context.query.search : null,
    page: context.query.page ? Number(context.query.page) : null,
  }));

  store.dispatch(loadDummyPushes(store.getState().page));

  return {
    props: {},
  };
});

export default Push;