import React from "react";
import {
  Header,
  Footer,
  BoardingForm,
  Steps,
} from "../../components/onBoarding";

const Step2 = () => {
  return (
    <main className="h-full flex flex-col justify-between">
      <div>
        <Header />
        <Steps completePercent="2/3" />
        <BoardingForm step2 />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
};

export default Step2;
