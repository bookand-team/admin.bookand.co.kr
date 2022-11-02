import Main from '../../components/main';
import Details from '../../components/member/details';
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
    section: 'member',
  }));

  return {
    props: {},
  };
});

export default DetailsPage;