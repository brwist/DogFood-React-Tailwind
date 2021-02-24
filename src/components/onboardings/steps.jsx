import React from "react";

const Steps = ({ completePercent }) => {
  return (
    <section className="flex flex-col items-center">
      <div className="on-boarding-form-container xs:px-5 xs:pt-5 md:pt-10">
        <div className="flex justify-between pb-3">
          {[
            { title: "Sign up" },
            { title: "Recipes" },
            { title: "Checkout" },
          ].map((item, idx) => {
            return (
              <div key={idx}>
                <p className="text-xs">{item.title}</p>
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
