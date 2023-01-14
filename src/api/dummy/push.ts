import { axiosFront } from '@config/axios';
import { PageState } from '@types';

// id값을 이용한 푸시 조회
export const readPush = async (param: { id: string; }) => {
  try {
    const response = await axiosFront.get(`/push/${param.id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

// 조건에 맞는 푸시 조회
export const readPushes = async (data: Partial<PageState>) => {
  try {
    const response = await axiosFront.post('/push/search', data);
    return response.data;
  } catch (error) {
    return null;
  }
};

// 전체 푸시 조회
export const readWholePushes = async () => {
  try {
    const response = await axiosFront.get('/push');
    return response.data;
  } catch (error) {
    return null;
  }
};