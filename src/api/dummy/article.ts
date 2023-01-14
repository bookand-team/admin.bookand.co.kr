import { PageState } from '@types';
import { postBody } from '@utils/post_body';

const baseUrl = `${process.env.NEXT_PUBLIC_AXIOS_FRONT_PROTOCOL}${process.env.NEXT_PUBLIC_AXIOS_FRONT_HOST}${process.env.NEXT_PUBLIC_AXIOS_FRONT_COMMON_PATH}`;

// id값을 이용한 아티클 조회
export const readArticle = async (param: { id: string; }) => {
  try {
    const response = await fetch(`${baseUrl}/article/${param.id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

// 조건에 맞는 아티클 조회
export const readArticles = async (data: Partial<PageState>) => {
  try {
    const response = await fetch(`${baseUrl}/article/search`, postBody(data));
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

// 전체 아티클 조회
export const readWholeArticles = async () => {
  try {
    const response = await fetch(`${baseUrl}/article`);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};