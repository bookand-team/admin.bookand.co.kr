import { Token } from './data';

export interface LoginReqDTO {
  email: string;
  password: string;
}

export interface LoginResDTO extends Token {
  accessToken: string;
  refreshToken: string;
}

export interface SilentLoginReqDTO {
  refreshToken: string;
}

export interface SilentLoginResDTO extends Token {
  accessToken: string;
  refreshToken: string;
}

export function isLoginSucRes(res: unknown): res is LoginResDTO {
  // res가 객체인지 확인
  if (!(res !== null && typeof res === 'object')) { return false; }
  // Access Token 확인
  if (!('accessToken' in res && typeof res.accessToken === 'string')) { return false; }
  // Refresh Token 확인
  if (!('refreshToken' in res && typeof res.accessToken === 'string')) { return false; }
  return true;
}