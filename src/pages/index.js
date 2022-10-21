import Login from '../components/login';
import { setPage } from '../redux/reducers/page';
import wrapper from '../redux/store';

const Home = () => {
  return (
    <Login />
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch(setPage({
    section: null,
    search: null,
    page: null,
  }));

  return {
    props: {},
  };
});

export default Home;