import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default Loader;
