import Main from '../../components/main';
import Management from '../../components/member/management';
import { loadDummyMembers } from '../../redux/reducers/members';
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

  store.dispatch(loadDummyMembers(store.getState().page));

  return {
    props: {},
  };
});

export default Member;