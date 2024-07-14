import React from "react";

export const Button = ({ children,className }) => {
  return (
    <button className={`transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300  py-2 px-5 bg-blue-800 text-white rounded-lg ${className}`}>
      {children}
    </button>
  );
};