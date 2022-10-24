import CurrentSituation from '../../components/dashboard/current_situation';
import TrendStatistics from '../../components/dashboard/trend_statistics';
import TypeStatistics from '../../components/dashboard/type_statistics';
import Main from '../../components/main';
import { setPage } from '../../redux/reducers/page';
import wrapper from '../../redux/store';

const Dashboard = () => {
  return (
    <Main>
      <CurrentSituation />
      <TypeStatistics />
      <TrendStatistics />
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch(setPage({
    section: 'dashboard',
    search: context.query.search ? context.query.search : null,
    page: context.query.page ? Number(context.query.page) : null,
  }));

  return {
    props: {},
  };
});

export default Dashboard;