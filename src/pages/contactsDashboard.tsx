import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { RootState } from "../store/store";

const ContactsDashboard: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-black text-white"></main>
    </div>
  );
};

export default ContactsDashboard;
