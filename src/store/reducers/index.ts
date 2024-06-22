import { combineReducers } from "@reduxjs/toolkit";
import loadingReducer from "./loadingReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  loading: loadingReducer,
  auth: authReducer,
});

export default rootReducer;
