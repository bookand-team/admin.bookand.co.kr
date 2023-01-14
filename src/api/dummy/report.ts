import { PageState } from '@types';
import { postBody } from '@utils/post_body';

const baseUrl = `${process.env.NEXT_PUBLIC_AXIOS_FRONT_PROTOCOL}${process.env.NEXT_PUBLIC_AXIOS_FRONT_HOST}${process.env.NEXT_PUBLIC_AXIOS_FRONT_COMMON_PATH}`;

// id값을 이용한 서점제보 조회
export const readReport = async (param: { id: string; }) => {
  try {
    const response = await fetch(`${baseUrl}/report/${param.id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

// 조건에 맞는 서점제보 조회
export const readReports = async (data: Partial<PageState>) => {
  try {
    const response = await fetch(`${baseUrl}/report/search`, postBody(data));
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

// 전체 서점제보 조회
export const readWholeReports = async () => {
  try {
    const response = await fetch(`${baseUrl}/report`);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};