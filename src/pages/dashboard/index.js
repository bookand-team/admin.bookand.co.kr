import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CurrentSituation from '../../components/dashboard/current_situation';
import Trendency from '../../components/dashboard/trendency';
import Main from '../../components/main';
import { setPage } from '../../redux/reducers/page';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({ section: 'dashboard' }));
  }, []);

  return (
    <Main>
      <CurrentSituation />
      <Trendency />
    </Main>
  );
};

export default Dashboard;