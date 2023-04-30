import { isReadPushResDTO, isReadPushesResDTO, PageState } from '@types';
import { axiosErrorHandler } from '@utils/error_handler';
import { postBody } from '@utils/post_body';

const baseUrl = `${process.env.NEXT_PUBLIC_AXIOS_FRONT_PROTOCOL}${process.env.NEXT_PUBLIC_AXIOS_FRONT_HOST}${process.env.NEXT_PUBLIC_AXIOS_FRONT_COMMON_PATH}`;

// id값을 이용한 푸시 조회
export const readPush = async (param: { id: string; }) => {
  try {
    const response = await fetch(`${baseUrl}/push/${param.id}`);
    const result = await response.json();
    if (isReadPushResDTO(result)) {
      return result;
    } else {
      return 'Not Vaild Format';
    }
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

// 조건에 맞는 푸시 조회
export const readPushes = async (data: Partial<PageState>) => {
  try {
    const response = await fetch(`${baseUrl}/push/search`, postBody(data));
    const result = await response.json();
    if (isReadPushesResDTO(result)) {
      return result;
    } else {
      return 'Not Vaild Format';
    }
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

// 전체 푸시 조회
export const readWholePushes = async () => {
  try {
    const response = await fetch(`${baseUrl}/push`);
    const result = await response.json();
    if (isReadPushesResDTO(result)) {
      return result;
    } else {
      return 'Not Vaild Format';
    }
  } catch (error) {
    return axiosErrorHandler(error);
  }
};