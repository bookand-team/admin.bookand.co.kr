import Registration from '@components/bookstore/registration';
import Main from '@components/common/main';
import { setPage } from '@redux/reducers/page';
import wrapper from '@redux/store';

const RegistrationPage = () => {
  return (
    <Main>
      <Registration />
    </Main>
  );
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