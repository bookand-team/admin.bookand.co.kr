import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Main from '../../components/main';
import { setPage } from '../../redux/reducers/page';

const Member = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({ section: 'member' }));
  }, []);

  return (
    <Main>
      Member
    </Main>
  );
};

export default Member;