// OptionsPage.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const OptionsPage = () => {
  const navigate = useNavigate();
  const { name } = useParams();

  const questionNav = (name) => {
    console.log("questions", name);

    navigate(`/questions/${name.toLowerCase()}`);
  };
  const codingNav = (name) => {
    navigate(`/codequestions/${name.toLowerCase()}`);
  };
  return (
    // Centering the options on the screen with a heading
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="m-4  font-bold text-2xl">Select an Option</h1>
      <div className="flex justify-center gap-4">
        <div className="cursor-pointer flex flex-col items-center bg-card p-6 rounded-lg shadow-2xl w-50" onClick={() => questionNav(name)}>
          <div className="text-lg font-semibold text-center  text-orange-500 ">
            <p className="mt-2 mb-2  text-orange-500">{name.toUpperCase()}</p> <p className=" text-orange-500">Theory Questions</p>
          </div>
        </div>
        <div className="cursor-pointer flex flex-col items-center bg-card p-6 rounded-lg shadow-2xl w-50" onClick={() => codingNav(name)}>
          <div className="text-lg font-semibold text-center  text-orange-500 ">
            <p className="mt-2 mb-2  text-orange-500">{name.toUpperCase()}</p> <p className=" text-orange-500">Coding Questions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsPage;
