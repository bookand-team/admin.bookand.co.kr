import Details from '../../components/article/details';
import Main from '../../components/main';
import { loadDummyArticle } from '../../redux/reducers/acticle';
import { setPage } from '../../redux/reducers/page';
import wrapper from '../../redux/store';

const DetailsPage = () => {
  return (
    <Main>
      <Details />
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch(setPage({
    section: 'article'
  }));

  store.dispatch(loadDummyArticle(context.params.id));

  return {
    props: {}
  };
});

export default DetailsPage;