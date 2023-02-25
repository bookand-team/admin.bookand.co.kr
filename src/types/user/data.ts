export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface UserState {
  isLoggedIn: boolean;

  token: Token | null;
  expired: boolean;

  myInfo: unknown;

  loginLoading: boolean;
  loginDone: boolean;
  loginError: boolean;

  silentLoginLoading: boolean;
  silentLoginDone: boolean;
  silentLoginError: boolean;

  logoutLoading: boolean;
  logoutDone: boolean;
  logoutError: boolean;
}