import { axiosFront } from '@config/axios';
import { PageState } from '@types';

// id값을 이용한 아티클 조회
export const readArticle = async (param: { id: string; }) => {
  try {
    const response = await axiosFront.get(`/article/${param.id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

// 조건에 맞는 아티클 조회
export const readArticles = async (data: Partial<PageState>) => {
  try {
    const response = await axiosFront.post('/article/search', data);
    return response.data;
  } catch (error) {
    return null;
  }
};

// 전체 아티클 조회
export const readWholeArticles = async () => {
  try {
    const response = await axiosFront.get('/article');
    return response.data;
  } catch (error) {
    return null;
  }
};