import { axiosFront } from '@config/axios';
import { PageState } from '@types';

// id값을 이용한 멤버 조회
export const readMember = async (param: { id: string; }) => {
  try {
    const response = await axiosFront.get(`/member/${param.id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

// 조건에 맞는 멤버 조회
export const readMembers = async (data: Partial<PageState>) => {
  try {
    const response = await axiosFront.post('/member/search', data);
    return response.data;
  } catch (error) {
    return null;
  }
};

// 전체 멤버 조회
export const readWholeMembers = async () => {
  try {
    const response = await axiosFront.get('/member');
    return response.data;
  } catch (error) {
    return null;
  }
};