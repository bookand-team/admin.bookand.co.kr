import Registration from '@components/bookstore/registration';
import { setPage } from '@redux/reducers/page';
import wrapper from '@redux/store';

const RegistrationPage = () => {
  return (<Registration />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(setPage({
    section: 'bookstore'
  }));

  return {
    props: {}
  };
});

export default RegistrationPage;