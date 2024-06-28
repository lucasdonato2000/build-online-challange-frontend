import * as Yup from "yup";

export const addContactValidationSchema = Yup.object({
  firstName: Yup.string().required(),
  surname: Yup.string().notRequired(),
  title: Yup.string().required(),
  address: Yup.string().required(),
  phone: Yup.string().required(),
  email: Yup.string().email("Invalid email address").required("Required"),

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
