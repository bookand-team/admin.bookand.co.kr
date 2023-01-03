import Modification from '../../components/bookstore/modification';
import Main from '../../components/main';
import { loadDummyBookstore } from '../../redux/reducers/bookstore';
import { setPage } from '../../redux/reducers/page';
import wrapper from '../../redux/store';

const ModificationPage = () => {
  return (
    <Main>
      <Modification />
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch(setPage({
    section: 'bookstore'
  }));

  store.dispatch(loadDummyBookstore(context.params?.id));

  return {
    props: {}
  };
});

export default ModificationPage;