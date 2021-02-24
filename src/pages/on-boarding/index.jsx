import React, { Component } from "react";
import { connect } from "react-redux";
import { onboardingActions } from "../../actions";
import Step1 from "./step-1";
import addEmpty from "../../assets/images/add-empty.png";
import FormWrapper from "../../components/onBoarding/common/form-wrapper";
import { Steps, Header } from "../../components/onBoarding";
import Dropdown from "../../components/onboardings/shared/dropdown";
import DogInput from "../../components/onboardings/shared/input";

class Onboarding extends Component {
  state = {
    options: [
      { value: "petty", id: 1 },
      { value: "petty", id: 2 },
      { value: "petty", id: 3 },
    ],
    dogName: "",
    breed: { label: "Type or select below" },
    age: { label: "Type of select below" },
    dogForm: [],
    dogs: [],
  };

  componentDidMount() {
    this.props.getOnboardingData();
  }

  addDog = () => {
    this.setState({
      dogForm: [...this.state.dogForm, this.state.dogForm.length + 1],
    });
  };

  setDogName = (dogName) => {
    this.setState({ dogName });
  };

  setBreed = (breed) => {
    this.setState({ breed });
  };

  setAge = (age) => {
    this.setState({ age });
  };

  render() {
    const { onboarding_starter_data } = this.props;
    return (
      <>
        <main className="h-full flex flex-col justify-between">
          <Header />
          <Steps completePercent="1/3" />
          <section className="flex flex-col items-center xs:mx-5 xs:pb-5 md:pb-10 xs:pt-4 md:pt-8">
            <form className="on-boarding-form-container">
              <DogForm
                breeds={
                  onboarding_starter_data && onboarding_starter_data.breeds
                }
                ages={onboarding_starter_data && onboarding_starter_data.ages}
                breed={this.state.breed}
                setBreed={this.setBreed}
                age={this.state.age}
                setAge={this.setAge}
                dogName={this.state.dogName}
                setDogName={this.setDogName}
              />
              {this.state.dogForm.map((idx) => (
                <React.Fragment key={idx}>
                  <DogForm
                    breeds={
                      onboarding_starter_data && onboarding_starter_data.breeds
                    }
                    ages={
                      onboarding_starter_data && onboarding_starter_data.ages
                    }
                    breed={this.state.breed}
                    setBreed={this.setBreed}
                    dogName={this.state.dogName}
                    setDogName={this.setDogName}
                  />
                </React.Fragment>
              ))}
              <div
                className="flex xs:px-4 md:px-9 py-5 bg-white rounded-lg xs:mt-5 md:mt-10 cursor-pointer"
                onClick={this.addDog}
              >
                <img src={addEmpty} />
                <p className="text-green-700 ml-3">I have another dog</p>
              </div>
            </form>
          </section>
        </main>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getOnboardingData: () => dispatch(onboardingActions.getOnboardingData()),
});

function mapStateToProps(state) {
  return {
    onboarding_starter_data: state.onboarding.onboarding_starter_data,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);

const DogForm = ({
  breeds,
  ages,
  breed,
  setBreed,
  age,
  setAge,
  dogName,
  setDogName,
}) => {
  const getBreedsList = () => {
    return (
      breeds &&
      breeds.map((item) => {
        return { label: item.label, value: item.value };
      })
    );
  };

  const getAgesList = () => {
    return (
      ages &&
      ages.map((item) => {
        return { label: item.label, value: item.value };
      })
    );
  };

  return (
    <FormWrapper>
      <div className="flex flex-col xs:pb-5 md:pb-10">
        <DogInput
          label="What’s your dog’s name?"
          placeholder="Type your dong's name here"
          value={dogName}
          setValue={setDogName}
        />
      </div>

      <Dropdown
        label="What’s their breed?"
        options={getBreedsList()}
        isCheckbox={true}
        helpText="Breed not listed or unknown mix"
        value={breed}
        setValue={setBreed}
      />

      <Dropdown
        label="How old is your dog?"
        options={getAgesList()}
        helpText="Breed not listed or unknown mix"
        value={age}
        setValue={setAge}
      />
    </FormWrapper>
  );
};
