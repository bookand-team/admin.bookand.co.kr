import { isReadBookstoreResDTO, isReadBookstoresResDTO, PageState } from '@types';
import { axiosErrorHandler } from '@utils/error_handler';
import { postBody } from '@utils/post_body';

const baseUrl = `${process.env.NEXT_PUBLIC_AXIOS_FRONT_PROTOCOL}${process.env.NEXT_PUBLIC_AXIOS_FRONT_HOST}${process.env.NEXT_PUBLIC_AXIOS_FRONT_COMMON_PATH}`;

// id값을 이용한 서점 조회
export const readBookstore = async (param: { id: string; }) => {
  try {
    const response = await fetch(`${baseUrl}/bookstore/${param.id}`);
    const result = await response.json();
    if (isReadBookstoreResDTO(result)) {
      return result;
    } else {
      return 'Not Vaild Format';
    }
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

// 조건에 맞는 서점 조회
export const readBookstores = async (data: Partial<PageState>) => {
  try {
    const response = await fetch(`${baseUrl}/bookstore/search`, postBody(data));
    const result = await response.json();
    if (isReadBookstoresResDTO(result)) {
      return result;
    } else {
      return 'Not Vaild Format';
    }
  } catch (error) {
    return axiosErrorHandler(error);
  }
};

// 전체 서점 조회
export const readWholeBookstores = async () => {
  try {
    const response = await fetch(`${baseUrl}/bookstore`);
    const result = await response.json();
    if (isReadBookstoresResDTO(result)) {
      return result;
    } else {
      return 'Not Vaild Format';
    }
  } catch (error) {
    return axiosErrorHandler(error);
  }
};