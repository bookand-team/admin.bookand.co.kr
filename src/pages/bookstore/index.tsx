import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BookstoreManagement from '@components/bookstore/management';
import { getToken, setPageState, setUserState, redirectPage } from '@hooks/use_server_side';
import { readBookstoreList } from '@redux/actions/bookstore';
import { logout, reissueToken } from '@redux/actions/user';
import { RootState } from '@redux/reducers';
import { setExpired } from '@redux/reducers/user';
import wrapper, { AppDispatch } from '@redux/store';
import { BookstoreStatusKey } from '@types';

const BookstorePage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const page = useSelector((state: RootState) => state.page);
  const { readBookstoreListError } = useSelector((state: RootState) => state.bookstore);

  /** 서점 목록 조회  */
  const readPageData = useCallback(async () => {
    // 만료된 토큰인 경우 토큰 재발행
    if (user.expired) { await dispatch(reissueToken({ refreshToken: user.token!.refreshToken })); }

    // 서점 목록 조회
    dispatch(readBookstoreList({
      params: {
        page: page.page,
        size: 10,
        search: page.search ? page.search : '',
        theme: page.theme ? page.theme : '',
        status: page.status ? page.status as BookstoreStatusKey : ''
      },
      headers: {
        Authorization: `Bearer ${user.token!.accessToken}`
      }
    }));
  }, [page, user.token, user.expired]);

  // 페이지 상태가 변할때마다 정보 다시 불러오기
  useEffect(() => {
    readPageData();
  }, [page, user.token, user.expired]);

  // 서점 목록 조회 실패 처리
  useEffect(() => {
    if (readBookstoreListError || user.reissueTokenError) {
      if (readBookstoreListError === '만료된 JWT입니다.') { dispatch(setExpired(true)); }
      if (user.reissueTokenError === '리프레시 토큰이 일치하지 않습니다.') {
        dispatch(logout());
        router.replace('/');
      }
    }
  }, [user.reissueTokenError, readBookstoreListError]);

  return (<BookstoreManagement />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // 페이지 상태 설정
  setPageState(store, context, 'bookstore', 10);

  // 유저 상태 설정
  const token = getToken(context);
  if (!token) { return redirectPage('/'); }  // 토큰이 없는 경우 로그인 페이지로 이동
  setUserState(store, token);

  return { props: {} };
});

export default BookstorePage;