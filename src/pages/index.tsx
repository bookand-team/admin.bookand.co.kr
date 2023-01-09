import Login from '@components/login';
import { setPage } from '@redux/reducers/page';
import wrapper from '@redux/store';

const LoginPage = () => {
  return (
    <Login />
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(setPage({
    section: 'login'
  }));

  return {
    props: {}
  };
});

export default LoginPage;