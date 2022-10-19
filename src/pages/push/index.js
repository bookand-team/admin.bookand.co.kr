import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Main from '../../components/main';
import Management from '../../components/push/management';
import Registration from '../../components/push/registration';
import { setPage } from '../../redux/reducers/page';

const Push = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({ section: 'push' }));
  }, []);

  return (
    <Main>
      <Management />
      <Registration />
    </Main>
  );
};

export default Push;