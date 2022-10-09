import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Main from '../../components/main';
import { setPage } from '../../redux/reducers/page';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({ section: 'dashboard' }));
  }, []);

  return (
    <Main>
      Dashboard
    </Main>
  );
};

export default Dashboard;