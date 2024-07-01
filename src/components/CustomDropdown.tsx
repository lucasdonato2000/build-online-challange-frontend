import React, { useState } from "react";
import { CustomDropdownProps } from "../types";
import { MdKeyboardArrowDown } from "react-icons/md";

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  field,
  form,
  contacts,
  defaultAvatar,
  handleContactChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (contactId: string) => {
    form.setFieldValue(field.name, contactId);
    handleContactChange(contactId);
    setIsOpen(false);
  };

  const selectedContact = contacts.find(
    (contact) => String(contact.id) === field.value
  );

  return (
    <div className={`relative ${className}`}>
      <div
        className="w-full p-2 rounded border border-gray-600 bg-black text-gray-400 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {selectedContact && (
            <img
              src={selectedContact.profilePicture || defaultAvatar}
              alt={selectedContact.name}
              className="w-6 h-6 rounded-full mr-2"
            />
          )}
          <span>
            {selectedContact ? selectedContact.name : "Search contact"}
          </span>
        </div>
        <MdKeyboardArrowDown className="w-5 h-5 text-gray-400" />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-black border border-gray-300 mt-1 rounded shadow-lg">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer border-b border-white last:border-0"
              onClick={() => handleSelect(String(contact.id))}
            >
              <img
                src={contact.profilePicture || defaultAvatar}
                alt={contact.name}
                className="w-6 h-6 rounded-full mr-2"
              />
              {contact.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
