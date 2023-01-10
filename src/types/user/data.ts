export interface UserState {
  isLoggedIn: boolean;
  accessToken: string | null;
  myInfo: unknown;

  loginLoading: boolean;
  loginDone: unknown;
  loginError: unknown;

  refreshLoginLoading: boolean;
  refreshLoginDone: unknown;
  refreshLoginError: unknown;
}