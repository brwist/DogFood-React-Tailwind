import React from "react";

const Steps = ({ completePercent }) => {
  {
    console.log("completePercent >>>", completePercent);
  }
  return (
    <section className="flex flex-col items-center">
      <div className="on-boarding-form-container xs:px-5 xs:pt-5 md:pt-10">
        <div className="flex justify-between pb-3">
          {[
            { title: "Sign up" },
            { title: "Recipes" },
            { title: "Checkout" },
          ].map(({ title }) => {
            return (
              <div>
                <p className="text-xs">{title}</p>
              </div>
            );
          })}
        </div>
        <div id="myProgress" className="rounded-lg">
          <div id="myBar" className={`rounded-lg w-${completePercent}`} />
        </div>
      </div>
    </section>
  );
};

export default Steps;
