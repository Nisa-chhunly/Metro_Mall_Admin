import React from "react";

const Button = ({
  text,
  type = "button",
  onClick,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 font-semibold ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;