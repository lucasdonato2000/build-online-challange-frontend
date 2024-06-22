import { combineReducers } from "@reduxjs/toolkit";
import loadingReducer from "./loadingReducer";
import authReducer from "./authReducer";
import contactReducer from "./contactReducer";

const rootReducer = combineReducers({
  loading: loadingReducer,
  auth: authReducer,
  contacts: contactReducer,
});

export default rootReducer;
