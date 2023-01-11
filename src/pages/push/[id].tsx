import Cookies from 'js-cookie';
import { useEffect } from 'react';

import Modification from '@components/push/modification';
import { refreshLogin } from '@redux/actions/user';
import { setPage } from '@redux/reducers/page';
import { loadDummyPush } from '@redux/reducers/push';
import wrapper from '@redux/store';
import { isLoginSucRes, PagePropsType } from '@types';

const ModificationPage = ({ refreshToken }: PagePropsType) => {
  useEffect(() => {
    Cookies.set('refreshToken', refreshToken);
  }, []);

  return (<Modification />);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // refreshToken이 없는 경우 로그인 페이지로 이동
  if (!(context.req.cookies && 'refreshToken' in context.req.cookies)) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    };
  }

  // 로그인 상태 확인 및 유지
  await store.dispatch(refreshLogin({ refreshToken: context.req.cookies['refreshToken'] as string }));

  // 만료된 refreshToken인 경우 로그인 페이지로 이동
  if (!isLoginSucRes(store.getState().user.refreshLoginDone)) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    };
  }

  // 페이지 상태 적용
  store.dispatch(setPage({
    section: 'push'
  }));

  // TODO: 페이지 상태에 따라 필요한 데이터 요청
  store.dispatch(loadDummyPush(context.params?.id));

  // 재발행 refreshToken 전달
  return {
    props: {
      refreshToken: store.getState().user.refreshLoginDone.refreshToken
    }
  };
});

export default ModificationPage;