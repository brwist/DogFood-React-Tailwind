import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ConfirmationModal from "./confirmation-modal";
import DeliveryFrequencyModal from "./delivery-frequency-modal";
import DeliveryDateModal from "./delivery-date-modal";

const GuideOptions = ({
  pauseMeal,
  cancelMeal,
  pauseType,
  pauseUntil,
  deliveryStartingDateOptions,
  dogIndex
}) => {
  const history = useHistory();
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeliveryFrequencyModalOpen, toggleDeliveryFrequencyModal] = useState(false);
  const [isDeliveryDateModalOpen, toggleDeliveryDateModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(!isOpen);
    }, 3000);
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMail = () => {
    window.location.href = "mailto:help@kabo.co";
  };

  return (
    <>
      <div className="grid grid-cols-1">
        <p className="lg:text-4xl sm:text-2xl font-bold font-cooper">Maybe We Can Help You?</p>
        <p className="mt-5 font-messina">
          Are you sure you are looking to pause Herbert’s plan? If you want to change your
          {" "}
          <br />
          upcoming delivery date, we suggest you click “Edit Delivery Date”.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5 font-messina">
        <div>
          <button
            onClick={handleMail}
            type="button"
            className="rounded-lg mt-10 py-2 w-full border-2 border-green text-primary focus:outline-none"
          >
            Contact Us
          </button>
        </div>
        <div>
          <button
            type="button"
            className="rounded-lg mt-10 py-2 w-full border-2 border-green text-primary focus:outline-none"
            onClick={() => toggleDeliveryDateModal(true)}
          >
            Edit Delivery Date
          </button>
        </div>
        <div>
          <button
            type="button"
            className="rounded-lg mt-10 py-2 w-full border-2 border-green text-primary focus:outline-none"
            onClick={() => history.push(`/edit-plan/${dogIndex}`)}
          >
            Edit a Meal Plan
          </button>
        </div>
        <div>
          <button
            type="button"
            className="rounded-lg mt-10 py-2 w-full border-2 border-green text-primary focus:outline-none"
            onClick={() => toggleDeliveryFrequencyModal(true)}
          >
            Edit Delivery Frequency
          </button>
        </div>
      </div>

      <div className="flex mt-10 font-messina">
        <input
          type="checkbox"
          className="mt-1.5 mr-2"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label>I understand that by proceeding, I will be pausing my subscription to Kabo.</label>
      </div>

      <div className="flex mt-10 font-messina">
        {pauseType === "forever" || pauseType === "cancel" ? (
          <button
            type="button"
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
            type="button"
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
      <DeliveryDateModal
        isOpen={isDeliveryDateModalOpen}
        toggle={toggleDeliveryDateModal}
        pauseUntil={pauseUntil}
        deliveryStartingDateOptions={deliveryStartingDateOptions}
      />
      <DeliveryFrequencyModal
        isOpen={isDeliveryFrequencyModalOpen}
        toggle={toggleDeliveryFrequencyModal}
      />
      <ConfirmationModal isOpen={isOpen} toggle={toggle} />
    </>
  );
};

export default GuideOptions;
