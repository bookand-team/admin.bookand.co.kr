import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Main from '../../components/main';
import { setPage } from '../../redux/reducers/page';

const Notice = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({ section: 'notice' }));
  }, []);

  return (
    <Main>
      Notice
    </Main>
  );
};

export default Notice;