import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import InputField from "./InputField";
import Button from "./Button";
import { updateContact } from "../store/actions";
import { AppDispatch, RootState } from "../store/store";
import {
  setLoading,
  resetEditedContact,
} from "../store/actions/editedContactActions";
import { setError, clearError } from "../store/actions/errorActions";
import { editContactValidationSchema } from "../schemas/editContactValidationSchema";
import { Contact, EditContactProps } from "../types";
import { selectContact } from "../store/reducers/selectedContactReducer";

const EditContact: React.FC<EditContactProps> = ({ contact, onSave }) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(
    (state: RootState) => state.editedContact.loading
  );
  const errorMessage = useSelector((state: RootState) => state.error.message);

  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | undefined
  >(contact.profilePicture);

  const isScreenSmall = window.innerWidth < 768;

  const handleFileChange =
    (setFieldValue: (field: string, value: any) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setFieldValue("profilePicture", file);
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setProfilePicturePreview(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };

  return (
    <div
      className={`relative flex flex-col items-center rounded-3xl p-4 sm:p-8 shadow-lg w-full max-w-5xl min-h-[40rem] mx-auto my-6 sm:my-12 ${
        isScreenSmall ? "bg-black pt-10" : "bg-custom-gray"
      }`}
    >
      <Formik
        initialValues={{
          name: contact.name || "",
          firstName: contact.name.split(" ")[0] || "",
          surname: contact.name.split(" ")[1] || "",
          title: contact.title || "",
          address: contact.address || "",
          phone: contact.phone || "",
          email: contact.email || "",
          profilePicture: undefined,
        }}
        validationSchema={editContactValidationSchema}
        onSubmit={async (values, actions) => {
          try {
            dispatch(setLoading(true));
            dispatch(clearError());

            const updatedContactData = {
              updatedContact: {} as Partial<Contact>,
              profilePictureFile: values.profilePicture,
            };

            if (isScreenSmall) {
              if (values.name !== contact.name) {
                updatedContactData.updatedContact.name = values.name;
              }
            } else {
              const [originalFirstName, originalSurname] =
                contact.name.split(" ");

              if (
                values.firstName !== originalFirstName ||
                values.surname !== originalSurname
              ) {
                updatedContactData.updatedContact.name = `${values.firstName} ${values.surname}`;
              }
            }

            if (values.title !== contact.title) {
              updatedContactData.updatedContact.title = values.title;
            }
            if (values.address !== contact.address) {
              updatedContactData.updatedContact.address = values.address;
            }
            if (values.phone !== contact.phone) {
              updatedContactData.updatedContact.phone = values.phone;
            }
            if (values.email !== contact.email) {
              updatedContactData.updatedContact.email = values.email;
            }

            if (
              Object.keys(updatedContactData.updatedContact).length > 0 ||
              updatedContactData.profilePictureFile
            ) {
              const response = await dispatch(
                updateContact({
                  id: contact.id,
                  changes: updatedContactData.updatedContact,
                  profilePictureFile: updatedContactData.profilePictureFile,
                })
              ).unwrap();
              if (response) {
                const updatedContact = {
                  ...contact,
                  ...updatedContactData.updatedContact,
                  profilePicture: response.profilePicture,
                  name: isScreenSmall
                    ? values.name
                    : `${values.firstName} ${values.surname}`,
                };

                onSave(updatedContact);
                dispatch(selectContact(updatedContact));
              }
            } else {
              onSave(contact);
              dispatch(selectContact(contact));
            }

            dispatch(resetEditedContact());
          } catch (error: any) {
            const errorMessage = error.message || "Failed to update contact";
            dispatch(setError(errorMessage));
            actions.setStatus(errorMessage);
          } finally {
            dispatch(setLoading(false));
            actions.setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, handleChange, values, status }) => (
          <Form className="w-full">
            <div
              className={`flex ${
                isScreenSmall ? "flex-row items-start" : "flex-col items-center"
              }`}
            >
              <div className={`mb-4 ${isScreenSmall ? "mr-4" : ""}`}>
                <img
                  src={profilePicturePreview || "/default-avatar.png"}
                  alt="Profile Preview"
                  className={`w-20 h-20 sm:w-32 sm:h-32 object-cover rounded-full ${
                    !isScreenSmall
                      ? "p-1 sm:border-4 sm:border-custom-green"
                      : ""
                  }`}
                />
              </div>
              <div className={isScreenSmall ? "" : "text-center"}>
                <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold pt-3 mb-2 font-red-hat">
                  {isScreenSmall
                    ? values.name
                    : `${values.firstName} ${values.surname}`}
                </h2>
                <p className="text-gray-400 text-base sm:text-lg lg:text-xl mb-4 sm:pt-3 font-public-sans">
                  {values.title}
                </p>
              </div>
            </div>

            <div className="w-full px-4 text-gray-400">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {isScreenSmall ? (
                  <div className="col-span-1">
                    <label className="text-gray-400">Name</label>
                    <InputField
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      className={`text-gray-600 font-public-sans ${
                        isScreenSmall ? "bg-custom-gray" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                ) : (
                  <>
                    <div className="col-span-1">
                      <label className="text-gray-400">First Name</label>
                      <InputField
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        className={`text-gray-600 font-public-sans ${
                          isScreenSmall ? "bg-custom-gray" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="text-gray-400">Surname</label>
                      <InputField
                        type="text"
                        name="surname"
                        value={values.surname}
                        onChange={handleChange}
                        className={`text-gray-600 font-public-sans ${
                          isScreenSmall ? "bg-custom-gray" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="surname"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </>
                )}
                <div className="col-span-1">
                  <label className="text-gray-400">Title</label>
                  <InputField
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    className={`text-gray-600 font-public-sans ${
                      isScreenSmall ? "bg-custom-gray" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-gray-400">Profile Picture</label>
                  <InputField
                    type="text"
                    name="profilePicture"
                    onChange={handleFileChange(setFieldValue)}
                    className={`text-gray-600 font-public-sans ${
                      isScreenSmall ? "bg-custom-gray" : ""
                    }`}
                    hideValue={true}
                    placeholder="Upload file"
                  />
                  <ErrorMessage
                    name="profilePicture"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-gray-400">Address</label>
                  <InputField
                    type="text"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    className={`text-gray-600 font-public-sans ${
                      isScreenSmall ? "bg-custom-gray" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-gray-400">Phone</label>
                  <InputField
                    type="text"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    className={`text-gray-600 font-public-sans ${
                      isScreenSmall ? "bg-custom-gray" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-gray-400">Email</label>
                  <InputField
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className={`text-gray-600 font-public-sans ${
                      isScreenSmall ? "bg-custom-gray" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-auto">
              <Button
                type="submit"
                className={`${
                  isScreenSmall
                    ? "w-2/3 h-14 sm:w-48 py-2 px-4 sm:px-8 rounded-full font-bold font-public-sans text-center mt-12"
                    : "w-full sm:w-48 py-2 px-4 sm:px-8 rounded-full font-medium font-inter text-center mt-4"
                }`}
                disabled={loading}
              >
                {isScreenSmall ? "SAVE" : "Save"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditContact;
