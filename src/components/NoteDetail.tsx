import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { NoteDetailProps } from "../types";
import { MdKeyboardArrowLeft } from "react-icons/md";

const NoteDetail: React.FC<NoteDetailProps> = ({ noteId, onBack }) => {
  const note = useSelector((state: RootState) =>
    state.notes.notes.find((note) => note.id === noteId)
  );
  const contact = useSelector((state: RootState) =>
    state.contacts.contacts.find(
      (contact) => String(contact.id) === note?.contactId
    )
  );

  if (!note || !contact) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black text-white p-4 rounded-3xl mt-6 shadow-lg w-full">
      <button
        className="flex items-center text-2xl font-bold mb-4"
        onClick={onBack}
      >
        <MdKeyboardArrowLeft className="inline-block mr-2" />
        Back
      </button>
      <div className="flex items-center mb-4">
        <img
          src={contact.profilePicture || "/default-avatar.png"}
          alt={contact.name}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold">{contact.name}</h2>
          <p className="text-gray-400 font-public-sans">{contact.phone}</p>
        </div>
      </div>
      <p className="text-white rounded-3xl border border-gray-600 h-full w-full p-2 font-red-hat">
        {note.content}
      </p>
    </div>
  );
};

export default NoteDetail;
