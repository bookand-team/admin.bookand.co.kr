import Main from '@components/common/main';
import { setPage } from '@redux/reducers/page';
import wrapper from '@redux/store';

const NoticePage = () => {
  return (
    <Main>
      Notice
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(setPage({
    section: 'notice'
  }));

  return {
    props: {}
  };
});

export default NoticePage;