import React from "react";
import PropTypes from "prop-types";
import Modal from "../global/modal";
import CustomDatePicker from "./custom-datepicker";

const DeliveryDateModal = ({
  isOpen, toggle, pauseUntil,setPauseUntil, deliveryStartingDateOptions,
}) => (
  <Modal
    title="Delivery Frequency"
    isFrequencyLogo
    noBackgroundColor
    isOpen={isOpen}
    onRequestClose={toggle}
  >
    <div className="flex flex-col justify-center items-center p-10 pb-20">
      <p className="text-2xl font-cooper pb-8">Edit next delivery date</p>
      <CustomDatePicker
        pauseUntil={pauseUntil}
        setPauseUntil={setPauseUntil}
        deliveryStartingDateOptions={deliveryStartingDateOptions}
      />
      <button
        type="button"
        className="rounded-xl font-messina w-56 mt-6 py-3 px-8 text-base font-bold bg-primary text-white"
        onClick={() => toggle(false)}
      >
        Pick Date
      </button>
    </div>
  </Modal>
);

DeliveryDateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  pauseUntil: PropTypes.number.isRequired,
  deliveryStartingDateOptions: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default DeliveryDateModal;
