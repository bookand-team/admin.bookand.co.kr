import Management from '@components/bookstore/management';
import Main from '@components/common/main';
import { loadDummyBookstores } from '@redux/reducers/bookstores';
import { setPage } from '@redux/reducers/page';
import wrapper from '@redux/store';

const BookstorePage = () => {
  return (
    <Main>
      <Management />
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch(setPage({
    section: 'bookstore',
    theme: context.query.theme ? context.query.theme : null,
    page: context.query.page ? Number(context.query.page) : 1,
    row: 10,
    search: context.query.search ? context.query.search : null,
    status: context.query.status ? context.query.status : null
  }));

  store.dispatch(loadDummyBookstores(store.getState().page));

  return {
    props: {}
  };
});

export default BookstorePage;