import axios from 'axios';

import { SilentLoginReqDTO, SilentLoginResDTO } from '@types';

// axios 기본 설정
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_AXIOS_PROTOCOL}${process.env.NEXT_PUBLIC_AXIOS_HOST}${process.env.NEXT_PUBLIC_AXIOS_COMMON_PATH}`;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// 토큰 재발행 요청
export const silentLogin = async (data: SilentLoginReqDTO): Promise<SilentLoginResDTO | undefined> => {
  try {
    const response = await axios.post('/auth/reissue', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 로그인 페이지로 이동
export const redirectLoginPage = () => {
  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  };
};