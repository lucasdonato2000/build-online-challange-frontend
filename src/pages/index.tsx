import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import { checkAuth } from "../store/actions/authActions";
import { RootState, AppDispatch } from "../store/store";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthChecked, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthChecked && isAuthenticated) {
      router.push("/contactsDashboard");
    }
  }, [isAuthChecked, isAuthenticated, router]);

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
