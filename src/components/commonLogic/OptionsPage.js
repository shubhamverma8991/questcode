import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const OptionsPage = () => {
  const navigate = useNavigate();
  const { name } = useParams();

  if (!name) {
    return <div>Error: Language name is missing</div>;
  }

  const navigateTo = (suffix) => {
    console.log("suffix " + suffix);

    navigate(`/${name.toLowerCase()}/${suffix}`);
  };

  const options = [
    { label: "Theory Questions", suffix: "" },
    // { label: "Pseudo Code Questions", suffix: "pseudocode" },
    { label: "Coding Round Questions", suffix: "code" },
  ];

  return (
    <div className="flex flex-col items-center justify-center" style={{ height: "90vh" }}>
      <h1 className="m-4 font-bold text-2xl">Select an Option</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {options.map((option, index) => (
          <div
            key={index}
            className="cursor-pointer flex flex-col items-center bg-card p-6 rounded-lg shadow-2xl w-50 min-w-64"
            onClick={() => navigateTo(option.suffix)}
          >
            <div className="text-lg font-semibold text-center">
              <p className="mt-2 mb-2  text-orange-500">{name.toUpperCase()}</p>
              <p className=" text-orange-500">{option.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionsPage;
