import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import Button from "./Button";
import { logout } from "../store/reducers/authReducer";

const Header: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className="bg-black shadow-md hidden lg:flex">
      <div className="container mx-auto bg-white rounded-3xl flex justify-between items-center h-16 p-4 mt-8 relative">
        <div className="ml-5 text-lg font-bold text-gray-800 pl-3 pr-3">
          <a href="/">
            <Image
              src="/Logo.svg"
              alt="buildonline logo"
              width={125}
              height={50}
              className="sm:w-32 sm:h-12"
            />
          </a>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:flex">
          <nav className="flex space-x-4 font-medium font-inter gradient-text">
            <a href="/contactDashboard" className="p-2 sm:p-4 mr-2">
              Contacts
            </a>
            <a href="/noteDashboard" className="p-2 sm:p-4 ml-2">
              Notes
            </a>
          </nav>
        </div>
        <div
          className="flex flex-none justify-end items-center"
          style={{ minWidth: "250px" }}
        >
          <nav className="flex space-x-4 font-medium items-center font-inter pr-3">
            {isAuthenticated ? (
              <>
                <span
                  className="text-black-600 p-2 sm:p-4 truncate"
                  style={{ maxWidth: "200px" }}
                >
                  Hola, {user?.email}
                </span>
                <Button
                  onClick={handleLogout}
                  className="py-1 px-4 sm:py-0.5 sm:px-6 leading-9"
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <a
                  href="/"
                  className="text-black-600 p-2 sm:p-4 hover:text-black-800"
                >
                  Log in
                </a>
                <Button
                  onClick={() => {}}
                  className="py-1 px-4 sm:py-0.5 sm:px-6 leading-9"
                >
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
