import Main from '../../components/main';
import Management from '../../components/member/management';
import { loadDummyMembers } from '../../redux/reducers/members';
import { setPage } from '../../redux/reducers/page';
import wrapper from '../../redux/store';

const MemberPage = () => {
  return (
    <Main>
      <Management />
    </Main>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch(setPage({
    section: 'member',
    page: context.query.page ? Number(context.query.page) : 1,
    role: context.query.role ? context.query.role : null,
    row: 10,
    search: context.query.search ? context.query.search : null,
    status: context.query.status ? context.query.status : null
  }));

  store.dispatch(loadDummyMembers(store.getState().page));

  return {
    props: {}
  };
});

export default MemberPage;