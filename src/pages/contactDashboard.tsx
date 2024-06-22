import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import ContactList from "../components/ContactList";
import SearchBar from "../components/SearchBar";
import { RootState, AppDispatch } from "../store/store";
import { fetchContacts, setSearchTerm } from "../store/reducers/contactReducer";
import Button from "../components/Button";
import useAuthRedirect from "../hooks/useAuthRedirect";

const ContactDashboard: React.FC = () => {
  const { isAuthChecked, isAuthenticated } =
    useAuthRedirect("/contactDashboard");
  const dispatch = useDispatch<AppDispatch>();
  const { contacts, filteredContacts, searchTerm, loading } = useSelector(
    (state: RootState) => state.contacts
  );

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchContacts());
    }
  }, [isAuthenticated, dispatch]);

  const handleSearchTermChange = (term: string) => {
    dispatch(setSearchTerm(term));
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex flex-1 flex-col items-center justify-start bg-black text-white w-full">
          Loading...
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-start bg-black text-white w-full">
        <div className="flex justify-between items-center w-full px-10 mt-20 mb-8">
          <h1 className="text-4xl font-bold text-left">Contacts</h1>
          <Button
            href="/addContact"
            className=" w-48 h-12 py-2 px-8 rounded-full font-medium font-inter"
          >
            Add new
          </Button>
        </div>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={handleSearchTermChange}
        />
        <div className="w-full px-10">
          <ContactList contacts={filteredContacts} />
        </div>
      </main>
    </div>
  );
};

export default ContactDashboard;
