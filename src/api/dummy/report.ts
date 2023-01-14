import { axiosFront } from '@config/axios';
import { PageState } from '@types';

// id값을 이용한 서점제보 조회
export const readReport = async (param: { id: string; }) => {
  try {
    const response = await axiosFront.get(`/report/${param.id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

// 조건에 맞는 서점제보 조회
export const readReports = async (data: Partial<PageState>) => {
  try {
    const response = await axiosFront.post('/report/search', data);
    return response.data;
  } catch (error) {
    return null;
  }
};

// 전체 서점제보 조회
export const readWholeReports = async () => {
  try {
    const response = await axiosFront.get('/report');
    return response.data;
  } catch (error) {
    return null;
  }
};