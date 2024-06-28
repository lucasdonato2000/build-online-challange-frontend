import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import ContactList from "../components/ContactList";
import ContactDetail from "../components/ContactDetail";
import SearchBar from "../components/SearchBar";
import { RootState, AppDispatch } from "../store/store";
import { setSearchTerm } from "../store/reducers/contactReducer";
import { fetchContacts } from "../store/actions";
import {
  selectContact,
  clearSelectedContact,
} from "../store/reducers/selectedContactReducer";
import { clearError } from "../store/reducers/errorReducer";
import Button from "../components/Button";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Contact } from "../types";
import AddContact from "../components/AddContact";
import Pagination from "../components/Pagination";

const ContactDashboard: React.FC = () => {
  const { isAuthChecked, isAuthenticated } =
    useAuthRedirect("/contactDashboard");

  const dispatch = useDispatch<AppDispatch>();

  const { searchTerm, total } = useSelector(
    (state: RootState) => state.contacts
  );

  const selectedContact = useSelector(
    (state: RootState) => state.selectedContact.selectedContact
  );
  const errorMessage = useSelector((state: RootState) => state.error.message);

  const [isScreenSmall, setIsScreenSmall] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 1250);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearchTermChange = (term: string) => {
    dispatch(setSearchTerm(term));
    setCurrentPage(1); // Reiniciar a la primera página al buscar
  };

  const handleContactSelect = (contact: Contact) => {
    dispatch(selectContact(contact));
  };

  const handleBack = () => {
    dispatch(clearSelectedContact());
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const handleEditSave = (updatedContact: Contact) => {
    setIsEditing(false);
    dispatch(selectContact(updatedContact));
  };

  const handleAddNewClick = () => {
    setIsAdding(true);
  };

  const handleAddSave = (newContact: Contact) => {
    setIsAdding(false);
    fetchContacts({ limit: contactsPerPage, offset: 0, searchTerm });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex flex-1 flex-col items-center justify-start bg-black text-white w-full">
          Checking authentication...
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex flex-1 flex-col items-center justify-start bg-black text-white w-full">
          Redirecting...
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-start bg-black text-white w-full relative">
        {errorMessage && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4">
            {errorMessage}
            <button onClick={handleClearError} className="ml-4 underline">
              Dismiss
            </button>
          </div>
        )}
        {!selectedContact && !isAdding && (
          <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center w-full px-4 sm:px-10 mt-10 sm:mt-20 mb-4 sm:mb-8">
            <h1 className="text-4xl font-bold text-center sm:text-left mb-4 sm:mb-0 hidden xs:block">
              Contacts
            </h1>
            <Button
              onClick={handleAddNewClick}
              className="w-48 h-12 flex items-center justify-center rounded-full font-medium font-inter text-center"
            >
              Add new
            </Button>
          </div>
        )}
        {!selectedContact && !isAdding && (
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={handleSearchTermChange}
          />
        )}
        <div className="w-full px-4 sm:px-10">
          {!selectedContact && !isAdding ? (
            <>
              <ContactList
                searchTerm={searchTerm} // Pasar searchTerm como prop
                contactsPerPage={contactsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onSelectContact={handleContactSelect}
              />
              <Pagination
                totalContacts={total}
                contactsPerPage={contactsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          ) : isAdding ? (
            <AddContact onSave={handleAddSave} onCancel={handleBack} />
          ) : (
            <div className="relative flex justify-center">
              <ContactDetail
                contact={selectedContact}
                onEdit={handleEditSave}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
              {!isScreenSmall && !isEditing && (
                <div
                  className="absolute right-32 bottom-4 lg:top-1/2 lg:transform lg:-translate-y-1/2 cursor-pointer bg-black p-2 rounded-full"
                  onClick={handleBack}
                >
                  <MdKeyboardArrowRight className="text-white h-8 w-8 transform rotate-180" />
                </div>
              )}
              {isScreenSmall && !isEditing && (
                <div
                  className="absolute right-4 bottom-4 bottom-1/4 xs:right-32 lg:top-auto lg:right-32 cursor-pointer bg-black p-2 rounded-full"
                  onClick={handleBack}
                >
                  <MdKeyboardArrowRight className="text-white h-8 w-8 transform rotate-180" />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ContactDashboard;
