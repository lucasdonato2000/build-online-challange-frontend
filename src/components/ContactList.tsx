import React from "react";
import { MdArrowForward } from "react-icons/md";

interface Contact {
  id: number;
  name: string;
  email: string;
  title: string;
  profilePicture: string;
}

interface ContactListProps {
  contacts: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  const defaultAvatar = "/default-avatar.png";

  return (
    <div className="contacts-list bg-black grid gap-4 gap-x-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 w-full mx-auto px-10">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="contact-item flex justify-between items-center p-4 mb-4 bg-custom-grey rounded-[27px] h-28"
        >
          <div className="flex items-center">
            <img
              src={contact.profilePicture || defaultAvatar}
              alt={contact.name}
              className="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <h2 className="text-white">{contact.name}</h2>
              <p className="text-gray-400">{contact.title}</p>
            </div>
          </div>
          <div className="arrow">
            <MdArrowForward className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
