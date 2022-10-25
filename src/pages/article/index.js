import Management from '../../components/article/management';
import Main from '../../components/main';
import { loadDummyArticles } from '../../redux/reducers/articles';
import { setPage } from '../../redux/reducers/page';
import wrapper from '../../redux/store';

const Article = () => {
  return (
    <Main>
      <Management />
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch(setPage({
    section: 'article',
    category: context.query.category ? context.query.category : null,
    page: context.query.page ? Number(context.query.page) : 1,
    row: 10,
    search: context.query.search ? context.query.search : null,
    status: context.query.status ? context.query.status : null,
  }));

  store.dispatch(loadDummyArticles(store.getState().page));

  return {
    props: {},
  };
});

export default Article;