import React, { useEffect, useState, useCallback } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchNotes } from "../store/actions/noteActions";
import { fetchContactById } from "../store/actions/contactActions";
import Loader from "./Loader";
import { NoteListProps } from "../types";

const NoteList: React.FC<NoteListProps> = ({
  searchTerm,
  notesPerPage,
  currentPage,
  onPageChange,
  onSelectNote,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { notes, loading } = useSelector((state: RootState) => state.notes);
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const contactsLoading = useSelector(
    (state: RootState) => state.contacts.loading
  );

  const [requestedContacts, setRequestedContacts] = useState<Set<string>>(
    new Set()
  );
  const [showLoader, setShowLoader] = useState(false);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        setShowLoader(true);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [loading]);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch, currentPage, notesPerPage, searchTerm]);

  useEffect(() => {
    notes.forEach((note) => {
      const contactId = note.contactId;
      if (
        !contacts.some((contact) => String(contact.id) === contactId) &&
        !requestedContacts.has(contactId)
      ) {
        dispatch(fetchContactById(contactId));
        setRequestedContacts((prev) => new Set(prev).add(contactId));
      }
    });
  }, [notes, contacts, requestedContacts, contactsLoading, dispatch]);

  const getContactDetails = useCallback(
    (contactId: string) => {
      const contact = contacts.find(
        (contact) => String(contact.id) === contactId
      );
      return (
        contact || { name: "Loading...", profilePicture: "/default-avatar.png" }
      );
    },
    [contacts]
  );

  const truncate = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  };

  const handleExpandClick = (noteId: string) => {
    setExpandedNoteId(expandedNoteId === noteId ? null : noteId);
  };

  if (loading && showLoader) {
    return <Loader />;
  }

  return (
    <div className="notes-list bg-black grid gap-4 gap-x-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
      {notes.map((note) => {
        const contactDetails = getContactDetails(note.contactId);
        const isExpanded = expandedNoteId === note.id;
        return (
          <div
            key={note.id}
            className={`note-item flex justify-between items-center p-2 sm:p-4 mb-2 sm:mb-4 bg-custom-grey rounded-[27px] ${
              isExpanded ? "h-auto" : "h-20 sm:h-28"
            } min-w-[80px]`}
          >
            <div className="flex items-center">
              <img
                src={contactDetails.profilePicture || "/default-avatar.png"}
                alt={contactDetails.name}
                className="w-16 sm:w-20 h-16 sm:h-20 rounded-full mr-2 xs:mr-4"
              />
              <div className="text-xs xs:text-base space-y-1 hidden xs:block">
                <h2 className="text-white">{contactDetails.name}</h2>
                <p className="text-gray-400">
                  {isExpanded ? note.content : truncate(note.content, 100)}
                </p>
              </div>
            </div>
            <div className="arrow hidden xs:block">
              <MdKeyboardArrowRight
                className={`h-4 w-4 sm:h-6 sm:w-6 text-gray-400 cursor-pointer ${
                  isExpanded ? "rotate-90" : ""
                }`}
                onClick={() => handleExpandClick(note.id ?? "")}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NoteList;
