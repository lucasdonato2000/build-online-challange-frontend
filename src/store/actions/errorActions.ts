import { AppDispatch, RootState } from "../store";
import {
  setError as setErrorAction,
  clearError as clearErrorAction,
} from "../reducers/errorReducer";

export const setError =
  (message: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    let errorMessage = message;
    let fieldErrors: { [key: string]: string } | undefined;

    switch (true) {
      case message.includes(
        "SQLITE_CONSTRAINT: UNIQUE constraint failed: contacts.userId, contacts.email"
      ):
        errorMessage = "You already have a contact with that email address.";
        fieldErrors = { email: "This email address is already in use." };
        break;
      case message.includes(
        "SQLITE_CONSTRAINT: UNIQUE constraint failed: contacts.userId, contacts.phone"
      ):
        errorMessage = "You already have a contact with that phone number.";
        fieldErrors = { phone: "This phone number address is already in use." };
        break;

      default:
        errorMessage = "An unexpected error occurred.";
    }

    dispatch(setErrorAction({ message: errorMessage, fieldErrors }));
  };

export const clearError = () => (dispatch: AppDispatch) => {
  dispatch(clearErrorAction());
};
