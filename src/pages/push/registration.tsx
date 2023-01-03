import Main from '../../components/main';
import Registration from '../../components/push/registration';
import { setPage } from '../../redux/reducers/page';
import wrapper from '../../redux/store';

const RegistrationPage = () => {
  return (
    <Main>
      <Registration />
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(setPage({
    section: 'push'
  }));

  return {
    props: {}
  };
});

export default RegistrationPage;