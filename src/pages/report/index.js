import Main from '../../components/main';
import Management from '../../components/report/management';
import { setPage } from '../../redux/reducers/page';
import wrapper from '../../redux/store';

const Report = () => {
  return (
    <Main>
      <Management />
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch(setPage({
    section: 'report',
    search: context.query.search ? context.query.search : null,
    page: context.query.page ? Number(context.query.page) : null,
  }));

  return {
    props: {},
  };
});

export default Report;