import axios from 'axios';

import { SilentLoginReq, SilentLoginRes } from '@types';

// axios 기본 설정
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_AXIOS_PROTOCOL}${process.env.NEXT_PUBLIC_AXIOS_HOST}${process.env.NEXT_PUBLIC_AXIOS_COMMON_PATH}`;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

export const silentLogin = async (data: SilentLoginReq): Promise<SilentLoginRes | undefined> => {
  try {
    const response = await axios.post('/auth/reissue', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const redirectLoginPage = () => {
  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  };
};