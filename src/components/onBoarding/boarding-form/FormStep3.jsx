import React, { useState } from "react";
import chevron from "../../../assets/images/chevron.svg";
import addEmpty from "../../../assets/images/add-empty.png";
import FormWrapper from "../common/form-wrapper";

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

const FormStep3 = () => {
  const options = [
    {
      label: "What’s your dog’s name?",
      isDropdown: false,
      placeholder: "Type your dog’s name here",
      isCheckbox: false,
    },
    {
      label: "What’s their breed?",
      isDropdown: true,
      options: [
        [
          { value: "petty", id: 1 },
          { value: "petty", id: 2 },
          { value: "petty", id: 3 },
        ],
      ],
      isCheckbox: true,
      bottomLabel: "Breed not listed or unknown mix",
    },
    {
      label: "How old is your dog?",
      isDropdown: true,
      options: [
        [
          { value: "petty", id: 1 },
          { value: "petty", id: 2 },
          { value: "petty", id: 3 },
        ],
      ],
      isCheckbox: false,
      bottomLabel:
        "We want to make sure your dog is eating right for its lifestage.",
    },
  ];
  const [dogCount, setDogCount] = useState(1);
  const [dogs, setDogs] = useState(
    Array.from({ length: dogCount }).map(() => {
      return options;
    })
  );

  return (
    <section className="flex flex-col items-center xs:mx-5 xs:pb-5 md:pb-10 xs:pt-4 md:pt-8">
      <form className="on-boarding-form-container">
        {dogs.map((dog) => (
          <FormWrapper>
            {dog.map(
              ({
                isCheckbox,
                options,
                label,
                bottomLabel,
                isDropdown,
                placeholder,
              }) => (
                <div className="flex flex-col xs:pb-5 md:pb-10">
                  <label className="font-semibold pb-3">{label}</label>
                  {!isDropdown && (
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
                  <div className="flex items-center">
                    {isCheckbox && (
                      <input type="checkbox" className="h-4 w-4 mr-3" />
                    )}
                    <p className="text-gray-400 text-xs">{bottomLabel}</p>
                  </div>
                </div>
              )
            )}
          </FormWrapper>
        ))}
        <div
          className="flex xs:px-4 md:px-9 py-5 bg-white rounded-lg xs:mt-5 md:mt-10 cursor-pointer"
          onClick={() => {
            setDogs(
              Array.from({ length: dogCount + 1 }).map(() => {
                return options;
              })
            );
            setDogCount(dogCount + 1);
          }}
        >
          <img src={addEmpty} />
          <p className="text-green-700 ml-3">I have another dog</p>
        </div>
      </form>
    </section>
  );
};

export default FormStep3;
