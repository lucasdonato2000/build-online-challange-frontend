import * as Yup from "yup";

export const editContactValidationSchema = Yup.object({
  firstName: Yup.string().notRequired(),
  surname: Yup.string().notRequired(),
  title: Yup.string().notRequired(),
  address: Yup.string().notRequired(),
  phone: Yup.string().notRequired(),
  email: Yup.string().email("Invalid email address").notRequired(),
  profilePicture: Yup.mixed()
    .test("fileSize", "File too large", (value) => {
      if (value) {
        return value && (value as File)?.size <= 1024 * 1024;
      }
      return true;
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      if (value) {
        return (
          value &&
          ["image/jpg", "image/jpeg", "image/png"].includes(
            (value as File).type
          )
        );
      }
      return true;
    }),
});
