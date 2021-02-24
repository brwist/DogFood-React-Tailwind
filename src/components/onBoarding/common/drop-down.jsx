import React, { useState } from "react";
import chevron from "../../../assets/images/chevron.svg";

const Dropdown = ({ options, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(name);
  return (
    <div className="drop-down mb-3 bg-transparent cursor-pointer outline-none text-gray-400 text-sm   mb-2.5  w-full h-full">
      <div
        className="selected flex justify-between border py-2 border-gray-400 rounded-lg px-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <a href="#">
          <span>{selectedValue}</span>
        </a>
        <img src={chevron} className="select-chevron w-3" />
      </div>
      <div className={`options ${isOpen ? "block" : "hidden"}`}>
        <ul className="border border-gray-400 rounded-md mt-2">
          {options[0].map(({ value, id }) => (
            <li
              onClick={() => {
                setSelectedValue(value);
                setIsOpen(!isOpen);
              }}
              key={id}
              className="border-b  border-gray-400 py-3 pl-2"
            >
              <a href="#" className="rounded-lg text-dark">
                {value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
