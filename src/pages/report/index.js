import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Main from '../../components/main';
import { setPage } from '../../redux/reducers/page';

const Report = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({ section: 'report' }));
  }, []);

  return (
    <Main>
      Report
    </Main>
  );
};

export default Report;