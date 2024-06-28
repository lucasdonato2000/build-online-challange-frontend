export interface ErrorState {
  message: string | null;
  fieldErrors: { [key: string]: string } | null;
}
