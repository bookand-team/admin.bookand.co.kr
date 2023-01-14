import { PageState } from '@types';
import { postBody } from '@utils/post_body';

const baseUrl = `${process.env.NEXT_PUBLIC_AXIOS_FRONT_PROTOCOL}${process.env.NEXT_PUBLIC_AXIOS_FRONT_HOST}${process.env.NEXT_PUBLIC_AXIOS_FRONT_COMMON_PATH}`;

// id값을 이용한 멤버 조회
export const readMember = async (param: { id: string; }) => {
  try {
    const response = await fetch(`${baseUrl}/member/${param.id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

// 조건에 맞는 멤버 조회
export const readMembers = async (data: Partial<PageState>) => {
  try {
    const response = await fetch(`${baseUrl}/member/search`, postBody(data));
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

// 전체 멤버 조회
export const readWholeMembers = async () => {
  try {
    const response = await fetch(`${baseUrl}/member`);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};