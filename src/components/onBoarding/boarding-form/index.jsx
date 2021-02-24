import React from "react";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";

const BoardingForm = ({ step1, step2, step3 }) => {
  return (
    <section>
      {step1 && <FormStep1 />}
      {step2 && <FormStep2 />}
      {step3 && <FormStep3 />}
    </section>
  );
};

export default BoardingForm;
