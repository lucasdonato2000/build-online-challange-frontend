import React from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import useAuthRedirect from "../hooks/useAuthRedirect";

const NoteDashboard: React.FC = () => {
  const { isAuthChecked, isAuthenticated } = useAuthRedirect("/noteDashboard");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-black text-white">
        Note Dashboard
      </main>
    </div>
  );
};

export default NoteDashboard;
