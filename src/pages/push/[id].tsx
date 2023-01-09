import Modification from '@components/push/modification';
import { setPage } from '@redux/reducers/page';
import { loadDummyPush } from '@redux/reducers/push';
import wrapper from '@redux/store';

const ModificationPage = () => {
  return (<Modification />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch(setPage({
    section: 'push'
  }));

  store.dispatch(loadDummyPush(context.params?.id));

  return {
    props: {}
  };
});

export default ModificationPage;