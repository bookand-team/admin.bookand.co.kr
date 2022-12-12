import CurrentSituation from '../../components/dashboard/current_situation';
import TrendStatistics from '../../components/dashboard/trend_statistics';
import TypeStatistics from '../../components/dashboard/type_statistics';
import Main from '../../components/main';
import { setPage } from '../../redux/reducers/page';
import wrapper from '../../redux/store';

const DashboardPage = () => {
  return (
    <Main>
      <CurrentSituation />
      <TypeStatistics />
      <TrendStatistics />
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(setPage({
    section: 'dashboard'
  }));

  return {
    props: {}
  };
});

export default DashboardPage;