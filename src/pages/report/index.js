import Main from '../../components/main';
import Management from '../../components/report/management';
import { setPage } from '../../redux/reducers/page';
import { loadDummyReports } from '../../redux/reducers/reports';
import wrapper from '../../redux/store';

const ReportPage = () => {
  return (
    <Main>
      <Management />
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch(setPage({
    section: 'report',
    page: context.query.page ? Number(context.query.page) : 1,
    row: 10,
    search: context.query.search ? context.query.search : null,
    status: context.query.status ? context.query.status : null,
  }));

  store.dispatch(loadDummyReports(store.getState().page));

  return {
    props: {},
  };
});

export default ReportPage;