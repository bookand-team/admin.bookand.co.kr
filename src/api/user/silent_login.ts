import { axiosBack } from '@config/axios';
import { SilentLoginReqDTO, SilentLoginResDTO } from '@types';

// 토큰 재발행 요청
export const silentLogin = async (data: SilentLoginReqDTO): Promise<SilentLoginResDTO | undefined> => {
  try {
    const response = await axiosBack.post('/auth/reissue', data);
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