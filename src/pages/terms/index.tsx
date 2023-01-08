import Main from '@components/common/main';
import { setPage } from '@redux/reducers/page';
import wrapper from '@redux/store';

const TermsPage = () => {
  return (
    <Main>
      Terms
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(setPage({
    section: 'terms'
  }));

  return {
    props: {}
  };
});

export default TermsPage;