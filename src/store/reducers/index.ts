import { combineReducers } from "@reduxjs/toolkit";
import loadingReducer from "./loadingReducer";
import authReducer from "./authReducer";
import contactReducer from "./contactReducer";
import selectedContactReducer from "./selectedContactReducer";
import errorReducer from "./errorReducer";
import editedContactReducer from "./editedContactReducer";
import noteReducer from "./noteReducer";
import mapReducer from "./mapReducer";

const rootReducer = combineReducers({
  loading: loadingReducer,
  auth: authReducer,
  contacts: contactReducer,
  selectedContact: selectedContactReducer,
  editedContact: editedContactReducer,
  error: errorReducer,
  notes: noteReducer,
  map: mapReducer,
});

export default rootReducer;
