import { GetServerSidePropsContext } from 'next/types';

import { silentLogin } from '@api/user';
import { SilentLoginResDTO } from '@types';

/** 토큰 재발행 요청 */
export const reissueToken = async (context: GetServerSidePropsContext): Promise<SilentLoginResDTO | null> => {
  // 쿠키에 refreshToken이 없는 경우 재로그인 필요
  if (!context.req.cookies['refreshToken']) {
    return null;
  }

  // 토큰 재발행 요청
  const token = await silentLogin({ refreshToken: context.req.cookies['refreshToken'] });

  // 쿠키의 refreshToken이 유효한 토큰이 아닌 경우 재로그인 필요
  if (!token) {
    return null;
  }

  // 재발행된 토큰 전달
  return token;
};

/** 로그인 페이지로 이동 */
export const redirectLoginPage = () => {
  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  };
};