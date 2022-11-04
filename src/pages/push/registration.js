import Registration from '../../components/push/registration';
import Main from '../../components/main';
import { setPage } from '../../redux/reducers/page';
import wrapper from '../../redux/store';

const RegistrationPage = () => {
  return (
    <Main>
      <Registration />
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch(setPage({
    section: 'push',
  }));

  return {
    props: {},
  };
});

export default RegistrationPage;