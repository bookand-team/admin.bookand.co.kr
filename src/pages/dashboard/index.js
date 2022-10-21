import CurrentSituation from '../../components/dashboard/current_situation';
import Trendency from '../../components/dashboard/trendency';
import Main from '../../components/main';
import { setPage } from '../../redux/reducers/page';
import wrapper from '../../redux/store';

const Dashboard = () => {
  return (
    <Main>
      <CurrentSituation />
      <Trendency />
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