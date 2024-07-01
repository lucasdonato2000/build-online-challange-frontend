import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import AddNote from "../components/AddNote";
import { RootState, AppDispatch } from "../store/store";
import { setSearchTerm, setCurrentPage } from "../store/reducers/noteReducer";
import { fetchNotes } from "../store/actions/noteActions";
import { fetchAllContacts } from "../store/actions/contactActions";
import { clearError } from "../store/reducers/errorReducer";
import Button from "../components/Button";
import useAuthRedirect from "../hooks/useAuthRedirect";
import Pagination from "../components/Pagination";
import BottomNavBar from "../components/BottomNavbar";
import NoteDetail from "../components/NoteDetail";

const NoteDashboard: React.FC = () => {
  const { isAuthChecked, isAuthenticated } = useAuthRedirect("/noteDashboard");

  const dispatch = useDispatch<AppDispatch>();

  const { searchTerm, total, loading } = useSelector(
    (state: RootState) => state.notes
  );
  const { contacts, loading: contactsLoading } = useSelector(
    (state: RootState) => state.contacts
  );
  const errorMessage = useSelector((state: RootState) => state.error.message);

  const [isScreenSmall, setIsScreenSmall] = useState<boolean>(false);
  const [currentPage, setCurrentPageState] = useState(1);
  const [notesPerPage] = useState(6);
  const [isAdding, setIsAdding] = useState(false);
  const [showNavBar, setShowNavBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

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
    if (isAuthenticated) {
      dispatch(fetchNotes());
    }
  }, [dispatch, isAuthenticated, currentPage, notesPerPage, searchTerm]);

  useEffect(() => {
    if (isAuthenticated && contacts.length === 0) {
      dispatch(fetchAllContacts());
    }
  }, [dispatch, isAuthenticated, contacts.length]);

  const handleSearchTermChange = (term: string) => {
    dispatch(setSearchTerm(term));
    setCurrentPageState(1);
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = (page: number) => {
    setCurrentPageState(page);
    dispatch(setCurrentPage(page));
  };

  const handleAddNewClick = () => {
    setIsAdding(true);
  };

  const handleSaveNote = () => {
    setIsAdding(false);
    dispatch(fetchNotes());
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const handleSelectNote = (noteId: string | null) => {
    setSelectedNoteId(noteId);
  };

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

  if (contactsLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white w-full">
        Loading contacts...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-16 bg-black">
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
        {!isAdding && !selectedNoteId && (
          <div className="flex flex-col items-center w-full px-4 sm:px-10 mt-10 sm:mt-20 mb-2 sm:mb-4">
            <div className="w-full flex justify-between items-center mb-4">
              <h1
                className={`text-3xl font-bold ${
                  isScreenSmall ? "text-center" : "text-left"
                }`}
              >
                Notes
              </h1>
              <Button
                onClick={handleAddNewClick}
                className={` flex items-center justify-center rounded-full font-medium font-inter text-center ${
                  isScreenSmall ? "w-28 h-12" : "w-48 h-12"
                }`}
              >
                Add new
              </Button>
            </div>
          </div>
        )}

        {isAdding ? (
          <AddNote onSave={handleSaveNote} onCancel={handleCancel} />
        ) : selectedNoteId ? (
          <div className="w-full flex justify-start px-4 sm:px-10">
            <NoteDetail
              noteId={selectedNoteId}
              onBack={() => handleSelectNote(null)}
            />
          </div>
        ) : (
          <>
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={handleSearchTermChange}
            />

            {isScreenSmall && (
              <div className="mb-10">
                <Pagination
                  totalItems={total}
                  itemsPerPage={notesPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
            <div className="w-full px-4 sm:px-10">
              <NoteList
                searchTerm={searchTerm}
                notesPerPage={notesPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onSelectNote={handleSelectNote}
                isScreenSmall={isScreenSmall}
              />
              {!isScreenSmall && (
                <Pagination
                  totalItems={total}
                  itemsPerPage={notesPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </>
        )}
      </main>
      {isScreenSmall && <BottomNavBar activeTab="notes" />}
    </div>
  );
};

export default NoteDashboard;
