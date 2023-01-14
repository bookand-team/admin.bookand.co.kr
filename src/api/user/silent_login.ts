import { axiosBack } from '@config/axios';
import { SilentLoginReqDTO, SilentLoginResDTO } from '@types';

// 토큰 재발행 요청
export const silentLogin = async (data: SilentLoginReqDTO): Promise<SilentLoginResDTO | null> => {
  try {
    const response = await axiosBack.post('/auth/reissue', data);
    return response.data;
  } catch (error) {
    return null;
  }
};