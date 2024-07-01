import * as Yup from "yup";

export const addNoteValidationSchema = Yup.object({
  contactId: Yup.string().required("Contact is required"),
  content: Yup.string().required("Content is required"),
});
