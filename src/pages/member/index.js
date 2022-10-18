import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Main from '../../components/main';
import Management from '../../components/member/management';
import { setPage } from '../../redux/reducers/page';

const Member = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({ section: 'member' }));
  }, []);

  return (
    <Main>
      <Management />
    </Main>
  );
};

export default Member;