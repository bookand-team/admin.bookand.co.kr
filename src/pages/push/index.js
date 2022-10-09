import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Main from '../../components/main';
import { setPage } from '../../redux/reducers/page';

const Push = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({ section: 'push' }));
  }, []);

  return (
    <Main>
      Push
    </Main>
  );
};

export default Push;