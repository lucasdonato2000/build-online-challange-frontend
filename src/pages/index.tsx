import React from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import useAuthRedirect from "../hooks/useAuthRedirect";

const Home: React.FC = () => {
  const { isAuthChecked, isAuthenticated } = useAuthRedirect("/");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-black text-white">
        {isAuthChecked && !isAuthenticated ? <LoginForm /> : null}
      </main>
    </div>
  );
};

export default Home;
