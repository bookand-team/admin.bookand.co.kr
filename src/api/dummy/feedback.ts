import { axiosFront } from '@config/axios';
import { PageState } from '@types';

// id값을 이용한 피드백 조회
export const readFeedback = async (param: { id: string; }) => {
  try {
    const response = await axiosFront.get(`/feedback/${param.id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

// 조건에 맞는 피드백 조회
export const readFeedbacks = async (data: Partial<PageState>) => {
  try {
    const response = await axiosFront.post('/feedback/search', data);
    return response.data;
  } catch (error) {
    return null;
  }
};

// 전체 피드백 조회
export const readWholeFeedbacks = async () => {
  try {
    const response = await axiosFront.get('/feedback');
    return response.data;
  } catch (error) {
    return null;
  }
};