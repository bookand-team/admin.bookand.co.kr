import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Main from '../../components/main';
import { setPage } from '../../redux/reducers/page';

const Terms = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({ section: 'terms' }));
  }, []);

  return (
    <Main>
      Terms
    </Main>
  );
};

export default Terms;