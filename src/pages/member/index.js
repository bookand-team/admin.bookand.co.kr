import Main from '../../components/main';
import Management from '../../components/member/management';
import { setPage } from '../../redux/reducers/page';
import wrapper from '../../redux/store';

const Member = () => {
  return (
    <Main>
      <Management />
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch(setPage({
    section: 'member',
    search: context.query.search ? context.query.search : null,
    page: context.query.page ? Number(context.query.page) : null,
  }));

  return {
    props: {},
  };
});

export default Member;