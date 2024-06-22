import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Button from "./Button";

const Header: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <header className="bg-black shadow-md">
      <div className="container mx-auto bg-white rounded-3xl flex justify-between items-center p-2 mt-8">
        <div className="ml-5 text-lg font-bold text-gray-800 pl-3">
          <a href="/">
            <Image
              src="/Logo.svg"
              alt="buildonline logo"
              width={125}
              height={50}
            />
          </a>
        </div>
        <div className="flex-1 flex justify-end">
          <nav className="flex space-x-4 font-medium font-inter gradient-text">
            <a href="/contacts" className="p-4 mr-2">
              Contacts
            </a>
          </nav>
        </div>
        <div className="flex-1 flex justify-start mr-auto">
          <nav className="flex space-x-4 font-medium font-inter gradient-text">
            <a href="/notes" className="p-4 ml-10">
              Notes
            </a>
          </nav>
        </div>
        <div className="flex flex-none justify-end">
          <nav className="flex space-x-4 font-medium items-center font-inter pr-3">
            {isAuthenticated ? (
              <>
                <span className="text-black-600 p-4">Hola, {user?.email}</span>
                <Button
                  onClick={handleLogout}
                  className="py-0.5 px-6 leading-9"
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <a href="/" className="text-black-600 p-4 hover:text-black-800">
                  Log in
                </a>
                <Button onClick={() => {}} className="py-0.5 px-6 leading-9">
                  Sign in
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
