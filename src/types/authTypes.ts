export interface AuthState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  error: string | null;
}
