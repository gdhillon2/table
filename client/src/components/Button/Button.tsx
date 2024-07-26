import React from "react";

interface ButtonProps {
  icon: string;
  description: string;
}

const Button: React.FC<ButtonProps> = ({ icon, description }) => {
  return (
    <div className="inline-block">
      <button className="relative flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        {icon}
        <div className="ml-2 overflow-hidden whitespace-nowrap text-gray-400 transition-all duration-300 ease-in-out max-w-0 group-hover:max-w-xs">
          {description}
        </div>
      </button>
    </div>
  );
};

export default Button;
