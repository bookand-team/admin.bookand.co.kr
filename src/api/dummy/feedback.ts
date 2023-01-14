import { PageState } from '@types';
import { postBody } from '@utils/post_body';

const baseUrl = `${process.env.NEXT_PUBLIC_AXIOS_FRONT_PROTOCOL}${process.env.NEXT_PUBLIC_AXIOS_FRONT_HOST}${process.env.NEXT_PUBLIC_AXIOS_FRONT_COMMON_PATH}`;

// id값을 이용한 피드백 조회
export const readFeedback = async (param: { id: string; }) => {
  try {
    const response = await fetch(`${baseUrl}/feedback/${param.id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

// 조건에 맞는 피드백 조회
export const readFeedbacks = async (data: Partial<PageState>) => {
  try {
    const response = await fetch(`${baseUrl}/feedback/search`, postBody(data));
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

// 전체 피드백 조회
export const readWholeFeedbacks = async () => {
  try {
    const response = await fetch(`${baseUrl}/feedback`);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};