import Modification from '../../components/bookstore/modification';
import Main from '../../components/main';
import { loadBookstore } from '../../redux/actions/bookstore';
import { setPage } from '../../redux/reducers/page';
import wrapper from '../../redux/store';

const BookstoreModificationPage = () => {
  return (
    <Main>
      <Modification />
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch(setPage({
    section: 'bookstore',
  }));

  store.dispatch(loadBookstore(context.params.id));

  return {
    props: {},
  };
});

export default BookstoreModificationPage;