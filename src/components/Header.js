import React from "react";
import logo from "../assets/logo.png";
const Header = () => {
  return (
    <header className="bg-card text-white flex items-center justify-center h-16 shadow-md mb-2">
      <div className="flex items-center">
        <img src={logo} alt="QuestCode Logo" className="h-10 w-10 mr-2" />
        <h1 className="text-2xl font-bold text-primary">QuestCode</h1>
      </div>
    </header>
  );
};

export default Header;
