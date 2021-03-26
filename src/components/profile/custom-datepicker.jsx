import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";

const CustomDatePicker = ({ pauseUntil, setPauseUntil, deliveryStartingDateOptions }) => {
  const disablePastDates = () => {
    const currentDate = moment().toDate();
    return currentDate;
  };

  const disableFutureDates = () => {
    const futureDates = moment().add(1, "M");
    return new Date(futureDates);
  };
  const getNextDeliveryDates = () => {
    const dates = [];
    if (deliveryStartingDateOptions && deliveryStartingDateOptions.length > 0) {
      deliveryStartingDateOptions.map((item) => dates.push(new Date(item.value * 1000)));
    }
    return dates;
  };

  return (
    <DatePicker
      dateFormat="YYYY-MM-DD"
      startDate
      selected={pauseUntil === null ? new Date() : pauseUntil}
      onChange={(date) => setPauseUntil(date)}
      inline
      useWeekdaysShort
      minDate={disablePastDates()}
      maxDate={disableFutureDates()}
      includeDates={getNextDeliveryDates()}
      highlightDates={getNextDeliveryDates()}
    />
  );
};

export default CustomDatePicker;
