export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface UserState {
  isLoggedIn: boolean;
  token: Token | null;
  myInfo: unknown;

  loginLoading: boolean;
  loginDone: unknown;
  loginError: unknown;
}