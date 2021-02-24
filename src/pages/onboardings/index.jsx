import React, { Component } from "react";
import { connect } from "react-redux";
import { onboardingActions } from "../../actions";
import { Steps, Header } from "../../components/onBoarding";
import FirstStep from "./step-1";
import SecondStep from "./step-2";
import ThirdStep from "./step-3";

class Onboarding extends Component {
  state = {
    step: 1,
    dogs: [],
    dogs_detail: [],
  };

  componentDidMount() {
    this.props.getOnboardingData();
  }

  handleAddDogDetails = () => {
    const data = {
      id: this.props.temp_user.temp_user_id,
      details: {
        step: "detail",
        dogs: this.state.dogs_detail,
      },
    };
    localStorage.setItem("dogs_detail", JSON.stringify(data.details));
    this.props.updateTempUser(data);
    this.setState({ step: this.state.step + 1 });
  };

  addDogs = (dog) => {
    this.setState({ dogs: [...this.state.dogs, dog] });
  };

  addDogsDetail = (dog) => {
    this.setState({ dogs_detail: [...this.state.dogs_detail, dog] });
  };

  handleDogsAdd = () => {
    const data = {
      step: "start",
      dogs: this.state.dogs,
    };
    localStorage.setItem("dogs", JSON.stringify(data));
    this.props.getDogsFromForm(data);
    this.props.creatingTempUser(data);
    this.setState({ step: this.state.step + 1, dogs: [] });
  };

  render() {
    const { dogs, step } = this.state;
    const {
      onboarding_starter_data,
      getOnboardingDetails,
      onboarding_details_data,
      dogs: selectedDogs,
      updateTempUser,
      temp_user,
    } = this.props;
    return (
      <React.Fragment>
        <Header />
        <Steps completePercent={`${step}/3`} />
        <main className="h-full flex flex-col justify-between">
          {step === 3 && (
            <FirstStep
              onboarding_starter_data={onboarding_starter_data}
              addDogs={this.addDogs}
            />
          )}
          {step === 2 && (
            <SecondStep
              selectedDogs={selectedDogs}
              addDogsDetail={this.addDogsDetail}
              getOnboardingDetails={getOnboardingDetails}
              onboarding_details_data={onboarding_details_data}
            />
          )}

          <ThirdStep />
          <div className="footer bg-white flex justify-center py-4">
            {step === 1 ? (
              <button
                disabled={dogs.length <= 0}
                onClick={this.handleDogsAdd}
                className={
                  dogs.length <= 0
                    ? "border btn mx-5 border-gray-300 xs:bg-green-600 xs:text-white md:bg-gray-200 md:text-gray-400  focus:outline-none rounded-lg py-3 px-20"
                    : "border btn mx-5 border-green-600 xs:bg-green-600 xs:text-white md:bg-green-600 md:text-white  focus:outline-none rounded-lg py-3 px-20"
                }
              >
                Next
              </button>
            ) : (
              <button
                onClick={this.handleAddDogDetails}
                className={
                  "border btn mx-5 border-green-600 xs:bg-green-600 xs:text-white md:bg-green-600 md:text-white  focus:outline-none rounded-lg py-3 px-20"
                }
              >
                Next
              </button>
            )}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getOnboardingData: () => dispatch(onboardingActions.getOnboardingData()),
  getDogsFromForm: (payload) =>
    dispatch(onboardingActions.getDogsFromForm(payload)),
  getOnboardingDetails: () =>
    dispatch(onboardingActions.getOnboardingDetails()),
  creatingTempUser: (payload) =>
    dispatch(onboardingActions.createTempUser(payload)),

  updateTempUser: (payload) =>
    dispatch(onboardingActions.updateTempUser(payload)),
});

function mapStateToProps(state) {
  return {
    onboarding_starter_data: state.onboarding.onboarding_starter_data,
    onboarding_details_data: state.onboarding.onboarding_details_data,
    dogs: state.onboarding.dogs,
    temp_user: state.onboarding.temp_user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
