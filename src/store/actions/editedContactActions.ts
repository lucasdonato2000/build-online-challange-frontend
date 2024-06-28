import { createAction } from "@reduxjs/toolkit";
import { Contact } from "../../types";

export const setEditedContact = createAction<Contact>(
  "editedContact/setEditedContact"
);
export const updateEditedContact = createAction<Partial<Contact>>(
  "editedContact/updateEditedContact"
);
export const setProfilePictureFile = createAction<File | null>(
  "editedContact/setProfilePictureFile"
);
export const resetEditedContact = createAction(
  "editedContact/resetEditedContact"
);
export const setLoading = createAction<boolean>("editedContact/setLoading");
