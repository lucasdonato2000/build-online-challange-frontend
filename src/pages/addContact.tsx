import React from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import useAuthRedirect from "../hooks/useAuthRedirect";

const AddContact: React.FC = () => {
  const { isAuthChecked, isAuthenticated } = useAuthRedirect("/addContact");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-black text-white">
        AddContact
      </main>
    </div>
  );
};

export default AddContact;
