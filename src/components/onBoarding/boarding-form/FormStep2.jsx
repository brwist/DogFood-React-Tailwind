import React, { useState } from "react";
import addEmpty from "../../../assets/images/add-empty.png";
import FormWrapper from "../common/form-wrapper";
import Dropdown from "../common/drop-down";

const Steps = ({ steps }) => (
  <div className="container">
    <div className="progress-container">
      <div className="progress" id="progress"></div>
      {steps.map(({ label }) => (
        <div className="relative">
          <div className="circle" />
          <p className="absolute xs:-left-3 -left-8 mt-5  text-sm md:w-20">
            {label}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const FormStep2 = () => {
  const options = [
    {
      label: "Bella is a",
      buttons: [{ value: "Female" }, { value: "Male" }],
      isButtons: true,
    },
    {
      label: "Is Bella spayed?",
      buttons: [{ value: "No" }, { value: "Yes" }],
      isButtons: true,
    },
    {
      label: "How much does Bella weigh?",
      buttons: [
        {
          value: "",
          placeholder: "0",
          isInput: true,
          isGreen: true,
          color: "transparent",
          textColor: "black",
        },
        {
          value: "",
          placeholder: "lbs",
          isInput: true,
          isTransparent: true,
          color: "green-700",
          textColor: "white",
        },
        {
          value: "",
          placeholder: "kg",
          isInput: true,
          isGray: true,
          color: "gray-400",
          textColor: "gray-700",
        },
      ],
      isButtons: true,
    },
    {
      label: "Bella’s body is...",
      isSteps: true,
      steps: [
        { label: "Skinny" },
        { label: "Ideal" },
        { label: "Rounded" },
        { label: "Chunky" },
      ],
    },
    {
      label: "Bella’s activity level is...",
      isSteps: true,
      steps: [{ label: "Lazy" }, { label: "Ideal" }, { label: "Very Active" }],
    },
  ];
  const [dogCount, setDogCount] = useState(2);
  const [dogs, setDogs] = useState(
    Array.from({ length: dogCount }).map(() => {
      return options;
    })
  );

  return (
    <section className="flex flex-col items-center xs:mx-5 xs:pb-5 md:pb-10 xs:pt-4 md:pt-8">
      <form className="on-boarding-form-container">
        {dogs.map((dog) => (
          <FormWrapper increaseSmallPadding>
            {dog.map(
              ({
                isCheckbox,
                options,
                label,
                bottomLabel,
                isDropdown,
                isInput,
                placeholder,
                isButtons,
                buttons,
                isSteps,
                steps,
              }) => (
                <div className="flex flex-col xs:pb-5 md:pb-10">
                  <label className="font-semibold pb-4">{label}</label>
                  {isInput && (
                    <input
                      placeholder={placeholder}
                      className=" input border border-gray-400 rounded-lg py-3"
                    />
                  )}
                  {isDropdown && (
                    <Dropdown
                      name="Type or select below"
                      inputValue="Type or select below"
                      options={options}
                    />
                  )}
                  {isButtons && (
                    <div className="flex">
                      {buttons.map(
                        (
                          { value, isInput, placeholder, color, textColor },
                          index
                        ) =>
                          !isInput ? (
                            <button
                              key={index}
                              className="border mr-3 border-green w-40  md:text-green-600  focus:outline-none rounded-lg py-3"
                            >
                              {value}
                            </button>
                          ) : (
                            <input
                              key={index}
                              className={`border step-input mr-3 md:border-${color}-400 placeholder-${textColor} text-${textColor} bg-${color} w-20 text-center focus:outline-none rounded-lg py-3`}
                              placeholder={placeholder}
                              value={value}
                            />
                          )
                      )}
                    </div>
                  )}
                  {isSteps && <Steps steps={steps} />}
                  {bottomLabel && (
                    <div className="flex items-center">
                      {isCheckbox && (
                        <input type="checkbox" className="h-4 w-4 mr-3" />
                      )}
                      <p className="text-gray-400 text-xs">{bottomLabel}</p>
                    </div>
                  )}
                </div>
              )
            )}
          </FormWrapper>
        ))}
      </form>
    </section>
  );
};

export default FormStep2;
