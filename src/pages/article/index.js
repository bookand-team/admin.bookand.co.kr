import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Main from '../../components/main';
import { setPage } from '../../redux/reducers/page';

const Article = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({ section: 'article' }));
  }, []);

  return (
    <Main>
      Article
    </Main>
  );
};

export default Article;