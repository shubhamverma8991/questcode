import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-card text-white flex items-center justify-center h-16 shadow-md mb-2">
      <div className="flex items-center hover:cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="PrepQuest Logo" className="h-10 w-10 mr-2" />
        <h1 className="text-3xl font-bold text-primary">PrepQuest</h1>
      </div>
    </header>
  );
};

export default Header;
