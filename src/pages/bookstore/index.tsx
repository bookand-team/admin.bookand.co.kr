import Cookies from 'js-cookie';

import { readBookstores } from '@api/dummy/bookstore';
import Management from '@components/bookstore/management';
import { setBookstores } from '@redux/reducers/bookstore';
import { setPage } from '@redux/reducers/page';
import { setLoginUser } from '@redux/reducers/user';
import wrapper from '@redux/store';
import { PagePropsType } from '@types';
import { redirectLoginPage, reissueToken } from '@utils/reissue_token';

const BookstorePage = ({ refreshToken }: PagePropsType) => {
  Cookies.set('refreshToken', refreshToken);

  return (<Management />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 토큰 재발행 (재발행 실패시 로그인 페이지로 이동)
  const token = await reissueToken(context);
  if (!token) { return redirectLoginPage(); }

  // 페이지 상태 적용
  store.dispatch(setLoginUser(token));
  store.dispatch(setPage({
    section: 'bookstore',
    theme: context.query.theme ? context.query.theme : null,
    page: context.query.page ? Number(context.query.page) : 1,
    row: 10,
    search: context.query.search ? context.query.search : null,
    status: context.query.status ? context.query.status : null
  }));

  // 필요한 데이터 요청 후 저장
  const response = await readBookstores(store.getState().page);
  if (response !== null && typeof response === 'object' && 'bookstores' in response && 'bookstoresLength' in response) {
    store.dispatch(setBookstores(response));
  }

  // 재발행 refreshToken 전달
  return {
    props: {
      refreshToken: token.refreshToken
    }
  };
});

export default BookstorePage;