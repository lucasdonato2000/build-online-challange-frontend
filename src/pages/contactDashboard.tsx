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
import BottomNavBar from "../components/BottomNavbar";

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
  const [showNavBar, setShowNavBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavBar(false);
      } else {
        setShowNavBar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleSearchTermChange = (term: string) => {
    dispatch(setSearchTerm(term));
    setCurrentPage(1);
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
    <div className="min-h-screen flex flex-col pb-16 bg-black">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-start bg-black text-white w-full relative">
        {isScreenSmall && selectedContact && (
          <div
            className="absolute z-50 top-2 left-2 flex items-center text-gray-400 cursor-pointer"
            onClick={handleBack}
          >
            <span className="text-2xl mr-2">&#8592;</span>
            {isEditing ? "Cancel" : "Back"}
          </div>
        )}
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
            <h1 className="text-3xl font-bold text-center sm:text-left mb-4 sm:mb-0">
              Contacts
            </h1>
            {!isScreenSmall && (
              <Button
                onClick={handleAddNewClick}
                className="w-48 h-12 flex items-center justify-center rounded-full font-medium font-inter text-center"
              >
                Add new
              </Button>
            )}
          </div>
        )}
        {!selectedContact && !isAdding && (
          <div className="w-full ">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={handleSearchTermChange}
            />
          </div>
        )}
        {isScreenSmall && !selectedContact && !isAdding && (
          <div className="justify-center mb-10">
            <Pagination
              totalItems={total}
              itemsPerPage={contactsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
        <div className="w-full px-4 sm:px-10">
          {!selectedContact && !isAdding ? (
            <>
              <ContactList
                searchTerm={searchTerm}
                contactsPerPage={contactsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onSelectContact={handleContactSelect}
                isScreenSmall={isScreenSmall}
              />
              {!isScreenSmall && (
                <Pagination
                  totalItems={total}
                  itemsPerPage={contactsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
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
                  <MdKeyboardArrowRight className="text-white h-8 w-8 transform" />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      {isScreenSmall && showNavBar && !selectedContact && !isAdding && (
        <BottomNavBar activeTab="contacts" />
      )}
    </div>
  );
};

export default ContactDashboard;
