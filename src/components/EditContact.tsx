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
    <div className="relative flex flex-col items-center bg-custom-grey rounded-3xl p-4 sm:p-8 shadow-lg w-full max-w-5xl min-h-[40rem] mx-auto my-6 sm:my-12">
      <Formik
        initialValues={{
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

            const [originalFirstName, originalSurname] =
              contact.name.split(" ");

            if (
              values.firstName !== originalFirstName ||
              values.surname !== originalSurname
            ) {
              updatedContactData.updatedContact.name = `${values.firstName} ${values.surname}`;
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
                  name: `${values.firstName} ${values.surname}`,
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
            <div className="flex flex-col sm:flex-row justify-start w-full items-center sm:items-start">
              <div className="w-24 sm:w-36 h-24 sm:h-32 mb-4 sm:mb-0 rounded-full border-4 border-custom-green flex items-center justify-center">
                <div className="rounded-full overflow-hidden w-20 sm:w-28 h-20 sm:h-28">
                  <img
                    src={profilePicturePreview || "/default-avatar.png"}
                    alt="Profile Preview"
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-start w-full px-6 py-4 sm:py-8">
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-2 font-red-hat truncate w-full text-center sm:text-left">
                  {values.firstName} {values.surname}
                </h2>
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg mb-4 pt-3 font-public-sans truncate w-full text-center sm:text-left">
                  {values.title}
                </p>
              </div>
            </div>

            <div className="w-full px-4 text-gray-400">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="text-gray-400">First Name</label>
                  <InputField
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    className="text-gray-600 font-public-sans"
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
                    className="text-gray-600 font-public-sans"
                  />
                  <ErrorMessage
                    name="surname"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-gray-400">Title</label>
                  <InputField
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    className="text-gray-600 font-public-sans"
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
                    className="text-gray-600 font-public-sans"
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
                    className="text-gray-600 font-public-sans"
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
                    className="text-gray-600 font-public-sans"
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
                    className="text-gray-600 font-public-sans"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex mt-4 justify-center">
              <Button
                type="submit"
                className="w-full sm:w-48 py-2 px-4 sm:px-8 rounded-full font-medium font-inter text-center  "
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditContact;
