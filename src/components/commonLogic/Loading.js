import React from "react";

const Loading = ({ fullScreen = false }) => {
  return (
    <div className={`flex justify-center items-center ${fullScreen ? "h-screen w-screen" : "h-full w-full"}`}>
      <div className="loader"></div>
      <style>{`
        .loader {
          border: 8px solid rgba(255, 255, 255, 0.3);
          border-top: 8px solid #ff6600;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
