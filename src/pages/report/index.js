import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Main from '../../components/main';
import Management from '../../components/report/management';
import { setPage } from '../../redux/reducers/page';

const Report = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({ section: 'report' }));
  }, []);

  return (
    <Main>
      <Management />
    </Main>
  );
};

export default Report;