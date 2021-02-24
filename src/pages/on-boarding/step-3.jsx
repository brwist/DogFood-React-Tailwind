import React from "react";
import {
  Header,
  Footer,
  BoardingForm,
  Steps,
} from "../../components/onBoarding";

const Step3 = () => {
  return (
    <main className="h-full flex flex-col justify-between">
      <div>
        <Header />
        <Steps completePercent="full" />
        <BoardingForm step3 />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
};

export default Step3;
