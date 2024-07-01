import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { RootState, AppDispatch } from "../store/store";
import { addNote } from "../store/actions/noteActions";
import InputField from "./InputField";
import { AddNoteProps, Contact } from "../types";
import Button from "./Button";
import { clearError } from "../store/actions";

const AddNote: React.FC<AddNoteProps> = ({ onSave, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const error = useSelector((state: RootState) => state.notes.error);
  const [selectedContact, setSelectedContact] = React.useState<Contact | null>(
    null
  );

  const defaultAvatar = "/default-avatar.png";

  const handleContactChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const contact = contacts.find(
      (contact) => String(contact.id) === e.target.value
    );
    setSelectedContact(contact || null);
    setFieldValue("contactId", e.target.value);
  };

  return (
    <div className="relative flex flex-col items-center bg-custom-grey rounded-3xl p-4 sm:p-8 shadow-lg w-full max-w-3xl min-h-[36rem] mx-auto my-6 sm:my-12">
      <div className="w-24 sm:w-32 h-24 sm:h-32 mb-4 rounded-full border-4 border-custom-green flex items-center justify-center">
        <div className="w-20 sm:w-28 h-20 sm:h-28 rounded-full overflow-hidden">
          <img
            src={selectedContact?.profilePicture || defaultAvatar}
            alt={selectedContact?.name || "Select a contact"}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 font-red-hat truncate w-full overflow-hidden whitespace-nowrap text-ellipsis text-center">
        {selectedContact?.name || "Select a contact"}
      </h2>

      <Formik
        initialValues={{ contactId: "", content: "" }}
        onSubmit={(
          values,
          {
            setSubmitting,
          }: FormikHelpers<{ contactId: string; content: string }>
        ) => {
          const note = {
            content: values.content,
          };
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
          <Form className="w-full">
            <div className="mb-2">
              <Field
                as="select"
                name="contactId"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleContactChange(e, setFieldValue)
                }
                className="w-full p-2 rounded border border-gray-600 text-gray-400 mt-4"
              >
                <option value="">Select a contact</option>
                {contacts.map((contact: Contact) => (
                  <option
                    key={`${contact.id}-${contact.name}`}
                    value={contact.id}
                  >
                    {contact.name}
                  </option>
                ))}
              </Field>
            </div>
            <div className="mb-4 pt-10 text-gray-400">
              <Field
                component={InputField}
                type="textarea"
                name="content"
                placeholder="Write your note here..."
                className="w-full"
                hidevalue={false}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setFieldValue("content", e.target.value);
                }}
              />
            </div>
            <div className="flex justify-center pt-10">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-48 py-2 px-4 sm:px-8 rounded-full font-medium font-inter text-center"
              >
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNote;
