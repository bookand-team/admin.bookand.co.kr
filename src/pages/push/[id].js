import Modification from '../../components/push/modification';
import Main from '../../components/main';
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
    section: 'push',
  }));

  return {
    props: {},
  };
});

export default ModificationPage;