import { GetServerSidePropsContext } from 'next/types';

/** 쿠키에 토큰이 있는지 확인 */
export const checkToken = (context: GetServerSidePropsContext): boolean => {
  if ((context.req.cookies['accessToken'] && context.req.cookies['refreshToken'])) {
    return true;
  }
  return false;
};