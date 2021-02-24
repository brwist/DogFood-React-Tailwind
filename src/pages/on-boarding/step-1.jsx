import React from "react";
import {
  Header,
  Footer,
  BoardingForm,
  Steps,
} from "../../components/onBoarding";

const Step1 = () => {
  return (
    <main className="h-full flex flex-col justify-between">
      <div>
        <Header />
        <Steps completePercent="1/3" />
        <BoardingForm step1/>
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
};

export default Step1;
