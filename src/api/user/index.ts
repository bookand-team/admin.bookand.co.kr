import { axiosFront } from '@config/axios';
import { Token } from '@types';

export const storeTokenInCookies = async (token: Token) => {
  try {
    await axiosFront.post('/user/login', token);
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteTokenInCookies = async () => {
  try {
    await axiosFront.get('/user/logout');
    return true;
  } catch (error) {
    return false;
  }
};