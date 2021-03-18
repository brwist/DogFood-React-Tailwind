import React from "react";

import { userActions } from "../../actions";

import MealPlanCard from "./mealplan-card.jsx";
import PaymentCardIcon from "../global/payment-card-icon.jsx";
import Button from "../global/button.jsx";
import Radio from "../global/radio";
import DogSelector from "./dog-selector.jsx";
import { connect } from "react-redux";

import SuccessIcon from "../../assets/images/success-icon.svg";
import { userSelectors } from "../../selectors/user.selectors";
import { userConstants } from "../../constants";
import SelectMealPlanModal from "./select-meal-plan";
import ChangePaymentMethodModal from "../profile/change-payment-method-modal";
import DeliveryAddressModal from "../profile/delivery-address-modal";

class UnpauseMealPlanModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogIndex: this.props.dogIndex,
      unpauseType: "next-delivery-1",
      isSuccess: false,
      isMealModalOpen: false,
      isAddressModalOpen: false,
    };
    this.setDog = this.setDog.bind(this);
    this.toggleMealPlanModal = this.toggleMealPlanModal.bind(this);
    this.togglePaymentModal = this.togglePaymentModal.bind(this);
    this.toggleAddressModal = this.toggleAddressModal.bind(this);
  }

  toggleMealPlanModal = () => {
    this.setState({ isMealModalOpen: !this.state.isMealModalOpen });
  };

  togglePaymentModal = () => {
    const { open_payment_modal } = this.props;
    this.props.openUpdatePaymentModal(!open_payment_modal);
  };

  toggleAddressModal = () => {
    this.setState({ isAddressModalOpen: !this.state.isAddressModalOpen });
  };

  setDog(i) {
    if (this.props.setDog) {
      this.props.setDog(i);
    }
    this.setState({
      dogIndex: i,
    });
  }

  unpauseMeal() {
    const dogId = this.props.dogs[this.state.dogIndex].id;
    const unpauseDate =
      this.state.unpauseType === "1_week" ||
        this.state.unpauseType === "2_week" ||
        this.state.unpauseType === "immediately"
        ? this.state.unpauseType
        : this.state.pauseUntil;

    this.setState({
      processing: true,
    });

    this.props.unpauseSubscription({
      dog_id: dogId,
      unpause_date: "",
      reactivate: this.props.isCancelled,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.processing) {
      if (prevProps.loading && !this.props.loading && !this.props.error) {
        this.setState({ isSuccess: true, processing: null });
      }
    }
  }

  render() {
    const { dogIndex } = this.state;
    const { dogs, user, error, errorMessage } = this.props;
    const dogsLength = dogs.length;
    const ccLastFour = user.card.last4;
    const currentDog = dogs[dogIndex];
    const { portion } = currentDog;

    const isMultiple = false;

    const discountCode = "GET50OFFBACK";
    const discountDescription = "50% off discount";
    const nextCharge = "$31.23";
    const address1 = user.subscription.shipping_address.line1;
    const address2 = `${user.subscription.shipping_address.city}, ${user.subscription.shipping_address.country} ${user.subscription.shipping_address.zip}`;

    const nextDeliveries = user.delivery_starting_date_options;

    return (
      <div className="p-7">
        {!this.state.isSuccess && (
          <>
            <div className="mb-6">
              {dogsLength > 1 && (
                <DogSelector
                  dogs={dogs}
                  setDog={this.setDog}
                  dogIndex={dogIndex}
                />
              )}
            </div>
            <h2 className="text-lg mb-5 font-bold">
              Yay! We're excited to have you back! Please confirm the following:
            </h2>
            <div className="flex w-full flex-wrap">
              <UnpauseCard title="CONFIRM MEAL PLAN" styles="bg-account">
                <MealPlanCard dogIndex={dogIndex} portion={portion} />
                <div className="mt-7">
                  <button
                    className="text-base text-primary font-bold"
                    onClick={this.toggleMealPlanModal}
                  >
                    Select a different meal plan
                  </button>
                </div>
              </UnpauseCard>
              <UnpauseCard title="BILLING INFO" styles="bg-account">
                {/* <input
                  defaultValue={discountCode}
                  className="p-3.5 w-full rounded"
                />
                <br />
                <span className="my-1.5 text-secondary font-black text-xs">
                  {discountDescription} applied{" "}
                </span>
                <br />
                <span className="text-sm my-2">
                  You will be charged {nextCharge} on October 13
                </span> */}
                <div className="flex my-6">
                  <PaymentCardIcon icon="visa" />
                  <span className="inline-block ml-3">
                    Card ending in {ccLastFour}
                  </span>
                </div>
                <button
                  className="text-base text-primary font-bold focus:outline-none"
                  onClick={this.togglePaymentModal}
                >
                  Update Payment Method
                </button>
              </UnpauseCard>
              <UnpauseCard title="MAILING ADDRESS" styles="bg-account">
                <div className="mb-7">
                  <span className="text-sm">{address1}</span>
                  <br />
                  <span className="text-sm">{address2}</span>
                  <br />
                </div>
                <button
                  className="text-base text-primary font-bold focus:outline-none"
                  onClick={this.toggleAddressModal}
                >
                  Update Mailing Address
                </button>
              </UnpauseCard>
              <UnpauseCard title="CONFIRM NEXT DELIVERY START" styles="text-sm">
                <div className="mb-4">
                  <Radio
                    value="next-delivery-1"
                    text={nextDeliveries[0].label}
                    onChange={() =>
                      this.setState({ unpauseType: "next-delivery-1" })
                    }
                    selected={this.state.unpauseType === "next-delivery-1"}
                  />
                </div>
                <div className="mb-4">
                  <Radio
                    value="next-delivery-2"
                    text={nextDeliveries[1].label}
                    onChange={() =>
                      this.setState({ unpauseType: "next-delivery-2" })
                    }
                    selected={this.state.unpauseType === "next-delivery-2"}
                  />
                </div>
                <div className="mb-4">
                  <Radio
                    value="next-delivery-3"
                    text={nextDeliveries[2].label}
                    onChange={() =>
                      this.setState({ unpauseType: "next-delivery-3" })
                    }
                    selected={this.state.unpauseType === "next-delivery-3"}
                  />
                </div>
              </UnpauseCard>
            </div>
            <br />
            {error ? (
              <div className="text-red-500 text-xs mt-1">
                {errorMessage
                  ? errorMessage
                  : "An error occured please try again later"}
              </div>
            ) : null}
            <Button
              filled={true}
              text={
                this.props.isCancelled
                  ? "Reactivate and continue"
                  : "Unpause and continue"
              }
              handleClick={() => {
                this.unpauseMeal();
              }}
            />
          </>
        )}
        {this.state.isSuccess && (
          <div className="text-center py-6 px-16">
            <div className="mb-6">
              {dogsLength > 1 && (
                <DogSelector
                  dogs={dogs}
                  setDog={this.setDog}
                  dogIndex={dogIndex}
                />
              )}
            </div>
            <img src={SuccessIcon} className="m-auto mb-6" />
            <h1 className="text-lg font-bold mb-4 m-auto">
              Your account has been successfully unpaused.
            </h1>
            <span className="mb-6">Your account is unpaused placeholder.</span>
            <br />
            <UnpauseSuccessSummary
              dogIndex={dogIndex}
              nextDate={nextDeliveries[0]}
              address1={address1}
              address2={address2}
            />
            <Button
              filled={true}
              text="Done"
              handleClick={() => this.unpauseMeal()}
            />
          </div>
        )}
        <SelectMealPlanModal
          isOpen={this.state.isMealModalOpen}
          toggle={this.toggleMealPlanModal}
          dogIndex={dogIndex}
        />

        <ChangePaymentMethodModal
          isOpen={this.props.open_payment_modal}
          toggle={this.togglePaymentModal}
          payment_billing_address={this.props.payment_billing_address}
          setBillingAddress={this.props.setBillingAddress}
          updatePaymentMethod={this.props.updatePaymentMethod}
          updating_payment_method={this.props.updating_payment_method}
        />

        <DeliveryAddressModal
          isOpen={this.state.isAddressModalOpen}
          toggle={this.toggleAddressModal}
        />
      </div>
    );
  }
}

class UnpauseCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title = "", styles = "" } = this.props;

    return (
      <div
        className={`rounded-lg p-3.5 mr-4 mb-4 responsive-unpause-modal-card ${styles}`}
      >
        <h2 className="mb-3.5 grey-text text-xs">{title}</h2>
        {this.props.children}
      </div>
    );
  }
}

class UnpauseLink extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { text = "", styles = "", linkTo = "" } = this.props;

    return (
      <a href={linkTo} className={`text-base text-primary font-bold ${styles}`}>
        {text}
      </a>
    );
  }
}

class UnpauseSuccessSummary extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      dogIndex = "",
      portion = "",
      nextDate = "",
      address1 = "",
      address2 = "",
    } = this.props;
    return (
      <div className="rounded-xl bg-account my-6 py-8 px-3">
        <div className="mb-10">
          <MealPlanCard dogIndex={dogIndex} portion={portion} />
        </div>
        <div className="flex text-left">
          <div className="w-1/2 mr-4">
            <span className="mb-3.5 grey-text text-xs">MAILING ADDRESS</span>
            <br />
            <span className="text-sm">{address1}</span>
            <br />
            <span className="text-sm">{address2}</span>
          </div>
          <div className="w-1/2">
            <span className="mb-3.5 grey-text text-xs">NEXT DELIVERY DATE</span>
            <br />
            <span className="text-sm">{nextDate}</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  unpauseSubscription: (userId) =>
    dispatch(userActions.unpauseSubscription(userId)),
});

function mapStateToProps(state) {
  const { user } = state;
  const { subscriptions, dogs, error, errorMessage } = state.user;
  return {
    user,
    subscriptions,
    dogs,
    error,
    errorMessage: errorMessage && errorMessage.message,
    loading: userSelectors.selectUserLoadingByKey(
      state,
      userConstants.UNPAUSE_SUBSCRIPTION_REQUESTED
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnpauseMealPlanModal);
