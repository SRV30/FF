import React from "react";
import DarkModeToggle from "../extras/DarkModeToggle";

const Home = () => {

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <DarkModeToggle />
   </div>
  );
};

export default Home;