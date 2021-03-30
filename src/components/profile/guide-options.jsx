import React, { useEffect, useState } from "react";
import ConfirmationModal from "./confirmation-modal";

const GuideOptions = ({ pauseMeal, cancelMeal, pauseType }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(!isOpen);
    }, 3000);
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="grid grid-cols-1">
        <p className="lg:text-4xl sm:text-2xl font-bold font-cooper">Maybe We Can Help You?</p>
        <p className="mt-5 text-sm font-messina mb-6">
          Are you sure you are looking to cancel Herbert’s plan? If you want to change your upcoming
          delivery date, we suggest you click “Edit Delivery Date”.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-y-10 gap-x-12 font-messina">
        {[
          { title: "Contact Us" },
          { title: "Edit Delivery Date" },
          { title: "Edit a Meal Plan" },
          { title: "Edit Delivery Frequency" },
        ].map(({ title }) => (
          <div key={title}>
            <button type="button" className="rounded-lg  py-2 font-semibold w-full border border-green text-primary focus:outline-none">
              {title}
            </button>
          </div>
        ))}
      </div>

      <div className="flex mt-10 font-messina">
        <input
          type="checkbox"
          className="mt-1.5 mr-2"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label>
          I understand that by proceeding, I will be cancelling my subscription to Kabo.
        </label>
      </div>

      <div className="flex mt-10 font-messina">
        {pauseType === "forever" || pauseType === "cancel" ? (
          <button
            className={
              !isChecked
                ? "px-10 py-3 bg-gray-300 text-green-600 font-medium rounded-lg focus:outline-none"
                : "px-10 py-3 bg-green-600 text-white font-medium rounded-lg focus:outline-none"
            }
            onClick={pauseType === "forever" ? pauseMeal : cancelMeal}
            disabled={!isChecked}
          >
            Confirm
          </button>
        ) : (
          <button
            className={
              !isChecked
                ? "px-10 py-3 bg-gray-300 text-green-600 font-medium rounded-lg focus:outline-none"
                : "px-10 py-3 bg-green-600 text-white font-medium rounded-lg focus:outline-none"
            }
            onClick={pauseMeal}
            disabled={!isChecked}
          >
            Confirm
          </button>
        )}
      </div>

      <ConfirmationModal isOpen={isOpen} toggle={toggle} />
    </>
  );
};

export default GuideOptions;
