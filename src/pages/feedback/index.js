import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Main from '../../components/main';
import { setPage } from '../../redux/reducers/page';

const Feedback = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({ section: 'feedback' }));
  }, []);

  return (
    <Main>
      Feedback
    </Main>
  );
};

export default Feedback;