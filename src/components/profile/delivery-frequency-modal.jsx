import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../global/modal";

const DeliveryFrequencyModal = ({ isOpen, toggle }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggle}
      isFrequencyLogo
      noBackgroundColor
      title="Delivery Frequency"
    >
      <div className="pb-10 pt-5 px-10">
        <div className="grid grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((__, index) => {
            const isActive = activeIndex === index;
            const textColor = isActive ? "text-white" : "";
            return (
              <div
                key={index}
                className={`py-5 font-cooper border border-gray-300 rounded-lg text-center ${
                  isActive && "bg-brightGreen"
                }`}
              >
                <h2 className={`text-2xl ${textColor}`}>Every</h2>
                <p className={`text-7xl font-cooper ${textColor}`}>{index + 1}</p>
                <p className={`text-md font-cooper pb-2 ${textColor}`}>Weeks</p>
                <p
                  className={`text-sm font-messina cursor-pointer ${
                    isActive ? "text-white" : "text-green-500"
                  } `}
                  onClick={() => setActiveIndex(index)}
                >
                  {!isActive ? "Select this option" : "Click to unselect"}
                </p>
              </div>
            );
          })}
        </div>
        <div className="pt-5">
          <p className="text-sm pb-3">
            This change will be reflected on your next delivery date: March 19, 2021
          </p>
          <p className="text-sm pb-4 text-green-500 cursor-pointer">Edit next delivery date</p>
          <button
            type="button"
            className="rounded-xl font-messina w-56 py-3 px-8 text-base font-bold bg-primary text-white"
            onClick={() => toggle(false)}
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

DeliveryFrequencyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
export default DeliveryFrequencyModal;
