import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Management from '../../components/article/management';
import Registration from '../../components/article/registration';
import Main from '../../components/main';
import { setPage } from '../../redux/reducers/page';

const Article = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({ section: 'article' }));
  }, []);

  return (
    <Main>
      <Management />
      <Registration />
    </Main>
  );
};

export default Article;