import React from "react";

const Footer = () => {
  return (
    <div className="footer bg-white flex justify-center py-4">
      <button
        disabled
        className="border btn mx-5 border-gray-300 xs:bg-green-600 xs:text-white md:bg-gray-200 md:text-gray-400  focus:outline-none rounded-lg py-3 px-20"
      >
        Next
      </button>
    </div>
  );
};

export default Footer;
