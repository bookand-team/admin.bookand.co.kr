import { isReadFeedbackResDTO, isReadFeedbacksResDTO, PageState } from '@types';
import { controlAxiosError } from '@utils/control_axios_error';
import { postBody } from '@utils/post_body';

const baseUrl = `${process.env.NEXT_PUBLIC_AXIOS_FRONT_PROTOCOL}${process.env.NEXT_PUBLIC_AXIOS_FRONT_HOST}${process.env.NEXT_PUBLIC_AXIOS_FRONT_COMMON_PATH}`;

// id값을 이용한 피드백 조회
export const readFeedback = async (param: { id: string; }) => {
  try {
    const response = await fetch(`${baseUrl}/feedback/${param.id}`);
    const result = await response.json();
    if (isReadFeedbackResDTO(result)) {
      return result;
    } else {
      return 'Not Vaild Format';
    }
  } catch (error) {
    return controlAxiosError(error);
  }
};

// 조건에 맞는 피드백 조회
export const readFeedbacks = async (data: Partial<PageState>) => {
  try {
    const response = await fetch(`${baseUrl}/feedback/search`, postBody(data));
    const result = await response.json();
    if (isReadFeedbacksResDTO(result)) {
      return result;
    } else {
      return 'Not Vaild Format';
    }
  } catch (error) {
    return controlAxiosError(error);
  }
};

// 전체 피드백 조회
export const readWholeFeedbacks = async () => {
  try {
    const response = await fetch(`${baseUrl}/feedback`);
    const result = await response.json();
    if (isReadFeedbacksResDTO(result)) {
      return result;
    } else {
      return 'Not Vaild Format';
    }
  } catch (error) {
    return controlAxiosError(error);
  }
};