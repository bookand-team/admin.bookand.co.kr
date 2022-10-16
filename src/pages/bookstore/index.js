import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Management from '../../components/bookstore/management';
import Main from '../../components/main';
import { setPage } from '../../redux/reducers/page';

const Bookstore = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({ section: 'bookstore' }));
  }, []);

  return (
    <Main>
      <Management />
    </Main>
  );
};

export default Bookstore;