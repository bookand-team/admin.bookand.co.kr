export interface UserState {
  isLoggedIn: boolean;
  accessToken: string | null;
  myInfo: unknown;

  loginLoading: boolean;
  loginDone: unknown;
  loginError: unknown;
}