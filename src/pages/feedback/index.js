import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Management from '../../components/feedback/management';

import Main from '../../components/main';
import { setPage } from '../../redux/reducers/page';

const Feedback = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({ section: 'feedback' }));
  }, []);

  return (
    <Main>
      <Management />
    </Main>
  );
};

export default Feedback;