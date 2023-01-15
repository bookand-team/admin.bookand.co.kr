import { GetServerSidePropsContext } from 'next/types';

type Redirect = {
  redirect: {
    destination: string;
    permanent: boolean;
  };
};

/** 쿠키에 토큰이 있는지 확인 후 없는 경우 로그인 페이지로 이동 */
export const checkToken = (context: GetServerSidePropsContext): Redirect | false => {
  // 쿠키에 토큰이 없는 경우 재로그인 필요
  if (!(context.req.cookies['accessToken'] && context.req.cookies['refreshToken'])) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
  return false;
};