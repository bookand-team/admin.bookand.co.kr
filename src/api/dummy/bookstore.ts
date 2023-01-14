import { axiosFront } from '@config/axios';
import { PageState } from '@types';

// id값을 이용한 서점 조회
export const readBookstore = async (param: { id: string; }) => {
  try {
    const response = await axiosFront.get(`/bookstore/${param.id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

// 조건에 맞는 서점 조회
export const readBookstores = async (data: Partial<PageState>) => {
  try {
    const response = await axiosFront.post('/bookstore/search', data);
    return response.data;
  } catch (error) {
    return null;
  }
};

// 전체 서점 조회
export const readWholeBookstores = async () => {
  try {
    const response = await axiosFront.get('/bookstore');
    return response.data;
  } catch (error) {
    return null;
  }
};