import Registration from '@components/article/registration';
import { setPage } from '@redux/reducers/page';
import wrapper from '@redux/store';

const RegistrationPage = () => {
  return (<Registration />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(setPage({
    section: 'article'
  }));

  return {
    props: {}
  };
});

export default RegistrationPage;