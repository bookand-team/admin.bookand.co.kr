// 로그인 요청
export interface LoginReqDTO {
  email: string;
  password: string;
}

// 로그인 응답
export interface LoginResDTO {
  accessToken: string;
  refreshToken: string;
}

// 토큰 재발행 요청
export interface reissueTokenReqDTO {
  refreshToken: string;
}

// 토큰 재발행 응답
export interface reissueTokenResDTO {
  accessToken: string;
  refreshToken: string;
}

// 토큰
export interface Token {
  accessToken: string;
  refreshToken: string;
}

// 토큰 타입인지 확인
export function isToken(data: unknown): data is Token {
  // res가 객체인지 확인
  if (!(data !== null && typeof data === 'object')) { return false; }
  // Access Token 확인
  if (!('accessToken' in data && typeof data.accessToken === 'string')) { return false; }
  // Refresh Token 확인
  if (!('refreshToken' in data && typeof data.accessToken === 'string')) { return false; }
  return true;
}

// 유저 상태
export interface UserState {
  isLoggedIn: boolean;

  token: Token | null;
  expired: boolean;

  myInfo: unknown;

  loginLoading: boolean;
  loginDone: boolean;
  loginError: unknown;

  reissueTokenLoading: boolean;
  reissueTokenDone: boolean;
  reissueTokenError: unknown;

  logoutLoading: boolean;
  logoutDone: boolean;
  logoutError: unknown;
}