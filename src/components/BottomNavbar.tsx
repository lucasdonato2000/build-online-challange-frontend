import React from "react";
import { useRouter } from "next/router";
import { BottomNavBarProps } from "../types";

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab }) => {
  const router = useRouter();

  const handleContactsClick = () => {
    router.push("/contactDashboard");
  };

  const handleNotesClick = () => {
    router.push("/noteDashboard");
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-custom-gray p-2 flex justify-around items-center border-t border-gray-700 rounded-full">
      <button
        onClick={handleContactsClick}
        className="flex flex-col items-center justify-center"
      >
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center ${
            activeTab === "contacts" ? "bg-green-500" : ""
          }`}
        >
          <img src="/contacts.svg" alt="Contacts" className="w-8 h-8" />
        </div>
      </button>
      <button
        onClick={handleNotesClick}
        className="flex flex-col items-center justify-center"
      >
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center ${
            activeTab === "notes" ? "bg-green-500" : ""
          }`}
        >
          <img src="/notes.svg" alt="Notes" className="w-8 h-8" />
        </div>
      </button>
    </div>
  );
};

export default BottomNavBar;
