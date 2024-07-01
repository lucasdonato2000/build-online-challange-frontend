import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { RootState, AppDispatch } from "../store/store";
import { addNote } from "../store/actions/noteActions";
import InputField from "./InputField";
import CustomDropdown from "./CustomDropdown";
import { AddNoteProps, Contact } from "../types";
import Button from "./Button";
import { addNoteValidationSchema } from "../schemas/addNoteValidationSchema";

const AddNote: React.FC<AddNoteProps> = ({ onSave, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const error = useSelector((state: RootState) => state.notes.error);
  const [selectedContact, setSelectedContact] = React.useState<Contact | null>(
    null
  );

  const isScreenSmall = window.innerWidth < 768;
  const defaultAvatar = "/default-avatar.png";

  const handleContactChange = (contactId: string) => {
    const contact = contacts.find(
      (contact) => String(contact.id) === contactId
    );
    setSelectedContact(contact || null);
  };

  return (
    <div
      className={`relative flex flex-col items-center rounded-3xl p-4 sm:p-8 shadow-lg w-full max-w-3xl min-h-[36rem] mx-auto my-6 sm:my-12 ${
        isScreenSmall ? "bg-black pt-4" : "bg-custom-gray"
      }`}
    >
      <Formik
        initialValues={{ contactId: "", content: "" }}
        validationSchema={addNoteValidationSchema}
        onSubmit={(
          values,
          {
            setSubmitting,
          }: FormikHelpers<{ contactId: string; content: string }>
        ) => {
          const note = { content: values.content };
          dispatch(addNote({ note, contactId: values.contactId }))
            .unwrap()
            .then(() => {
              setSubmitting(false);
              onSave();
            })
            .catch(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="w-full flex flex-col h-full">
            {isScreenSmall && (
              <div className="w-full flex justify-between items-center mb-4">
                <Button
                  type="button"
                  onClick={onCancel}
                  className="text-3xl font-bold text-left text-white !bg-black"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center rounded-full font-medium font-inter text-center w-28 h-12"
                >
                  Save
                </Button>
              </div>
            )}

            {!isScreenSmall && (
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full border-4 border-custom-green flex items-center justify-center mb-2">
                  <div className="w-20 sm:w-28 h-20 sm:h-28 rounded-full overflow-hidden">
                    <img
                      src={selectedContact?.profilePicture || defaultAvatar}
                      alt={selectedContact?.name || "Search contact"}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 font-red-hat truncate w-full overflow-hidden whitespace-nowrap text-ellipsis text-center">
                  {selectedContact?.name || "Search contact"}
                </h2>
              </div>
            )}

            <div className="mb-2 mt-10 w-full">
              <Field
                name="contactId"
                component={CustomDropdown}
                contacts={contacts}
                defaultAvatar={defaultAvatar}
                handleContactChange={(value: string) =>
                  handleContactChange(value)
                }
                className={`${isScreenSmall ? "" : "w-full mx-auto"}`}
              />
              <ErrorMessage
                name="contactId"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div
              className={`mb-4 pt-10 flex-grow ${
                isScreenSmall ? "text-gray-400 y-max h-96" : ""
              }`}
            >
              <Field
                component={InputField}
                type="textarea"
                name="content"
                placeholder="Type your note here..."
                className={`w-full h-full ${
                  isScreenSmall
                    ? "bg-black border border-gray-600 text-gray-400 h-96"
                    : "border border-gray-300 h-72 bg-black"
                }`}
                hidevalue={false}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setFieldValue("content", e.target.value);
                }}
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            {!isScreenSmall && (
              <div className="flex justify-center pt-10">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-48 py-2 px-4 sm:px-8 rounded-full font-medium font-inter text-center"
                >
                  Save
                </Button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNote;
