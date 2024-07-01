import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchContacts } from "../store/actions";
import { ContactListProps } from "../types";
import Loader from "./Loader";

const ContactList: React.FC<ContactListProps> = ({
  searchTerm,
  contactsPerPage,
  currentPage,
  onPageChange,
  onSelectContact,
  isScreenSmall,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { contacts, loading } = useSelector(
    (state: RootState) => state.contacts
  );

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        setShowLoader(true);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [loading]);

  useEffect(() => {
    dispatch(
      fetchContacts({
        limit: contactsPerPage,
        offset: (currentPage - 1) * contactsPerPage,
        searchTerm,
      })
    );
  }, [dispatch, searchTerm, currentPage, contactsPerPage]);

  const defaultAvatar = "/default-avatar.png";

  if (loading && showLoader) {
    return <Loader />;
  }

  return (
    <div className="contacts-list bg-black grid gap-4 gap-x-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className={`contact-item flex justify-between items-center p-2 sm:p-4 mb-2 sm:mb-4 rounded-[27px] h-20 sm:h-28 min-w-[80px] ${
            isScreenSmall ? "bg-black border border-gray-500" : "bg-custom-gray"
          }`}
        >
          <div className="flex items-center">
            <img
              src={contact.profilePicture || defaultAvatar}
              alt={contact.name}
              className="w-16 sm:w-20 h-16 sm:h-20 rounded-full mr-2 xs:mr-4"
            />
            <div className="text-xs xs:text-base space-y-1">
              <h2 className="text-white">{contact.name}</h2>
              <p className="text-gray-400">{contact.title}</p>
            </div>
          </div>
          <div className="arrow">
            <MdKeyboardArrowRight
              className="h-4 w-4 sm:h-6 sm:w-6 text-gray-400 cursor-pointer"
              onClick={() => onSelectContact(contact)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
