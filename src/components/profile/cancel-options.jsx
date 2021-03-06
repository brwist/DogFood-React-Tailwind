import React, { useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import Radio from "../global/radio";
import CancelReason from "../account/cancel-reasons";
import ConfirmationMessage from "./confirmation-message";
import { cancelConstants } from "../../constants"
import GuideOptions from "./guide-options";
import { otherConstants } from "../../constants";
import { ReactComponent as ArrowIcon } from "../../assets/images/arrow-small.svg";

const CancelOptions = ({
  dogIndex,
  currentDog,
  userName,
  subscriptionPhase,
  subscriptionCancel,
  isSubscriptionPaused,
  pauseSubscription,
  cancelSubscription,
  subscription,
  delivery_starting_date_options,
}) => {
  const [pauseBoxType, setPauseBoxType] = useState('MAIN');
  const [pauseType, setPauseType] = useState('1_delivery');
  const [pauseUntil, setPauseUntil] = useState(null);
  const [reason, setReason] = useState('');

  const pauseMeal = () => {
    const dogId = currentDog.id;
    const pauseUntilToSend =
      pauseType === '1_delivery' ||
      pauseType === '2_deliveries' ||
      pauseType === 'forever'
        ? pauseType
        : moment(pauseUntil).format('YYYY-MM-DD');

    let pausePayload = {
      dog_id: dogId,
      pause_until: pauseUntilToSend,
    }

    if (pauseType === 'forever') {
      pausePayload.reason = reason.value;
    }
    pauseSubscription(pausePayload)
  };

  const cancelMeal = () => {
    cancelSubscription({
      dog_id: currentDog.id,
      reason: reason.value,
    });
  };

  const handleDateSelection = () => {
    setPauseType('specific');
    setPauseBoxType('MAIN');
  }
  const cancelDateSelection = () => {
    setPauseType('specific');
    setPauseBoxType('MAIN');
    setPauseUntil(null)
  }

  const disablePastDates = () => {
    const currentDate = moment().toDate();
    return currentDate
  }

  const disableFutureDates = () => {
    const futureDates = moment().add(1, 'M')
    return new Date(futureDates)
  }

  const getNextDeliveryDates = () => {
    let dates = [];
    delivery_starting_date_options && delivery_starting_date_options.length > 0 &&
    delivery_starting_date_options.map((item) => {
      dates.push(new Date(item.value * 1000))
    })
    return dates
  }

  const handleRadioChange = (opt) => {
    if (opt.value === 'specific') {
      if (pauseUntil === null) {
        setPauseBoxType('TIME');
      } else {
        setPauseType('specific');
      }
    } else {
      setPauseType(opt.value);
    }
  }

  const options = [
    {
      value: '1_delivery',
      text: `Pause ${currentDog.name}'s account ${cancelConstants.ONE_DELIVERY}`,
      displayText: cancelConstants.ONE_DELIVERY,
    },
    {
      value: '2_deliveries',
      text: `Pause ${currentDog.name}'s account ${cancelConstants.TWO_DELIVERIES}`,
      displayText: cancelConstants.TWO_DELIVERIES,
    },
    {
      value: 'forever',
      text: `Pause ${currentDog.name}'s account indefinitley`,
      displayText: cancelConstants.FOREVER,
    },
    subscriptionPhase &&
      subscriptionPhase.status &&
      subscriptionPhase.status !== otherConstants.SUBSCRIPTION_STATUS.WAITING_FOR_TRIAL_SHIPMENT &&
    {
      value: 'specific',
      text: (
        <div>
          Pause until
          {pauseUntil === null
            ? ' a specific date'
            : <span> {moment(pauseUntil).format('MMM DD, YYYY')}</span>}
        </div>
      ),
      displayText: cancelConstants.ONE_DELIVERY,
    },
    {
      value: 'cancel',
      text: 'Cancel deliveries',
      displayText: cancelConstants.CANCEL,
    },
  ];
  return (
    <React.Fragment>
      <div className="mb-5">
        { isSubscriptionPaused ? (
          <div className="py-6 px-16">
            <div className="flex items-center flex-col mb-4">
              <h2 className="text-xl font-bold mb-5">
                Your account has been successfully paused
              </h2>
              <div className="w-full p-6 bg-promptYellow rounded-1lg">
                <h4 className="text-center text-base font-semibold mb-1">
                  You can reactivate anytime
                </h4>
                <p className="text-center text-sm">
                  Keep in mind you can pause your account at anytime
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <a
                href="/profile"
                className="rounded-xl py-3 px-8 text-base font-bold bg-primary text-white"
              >
                Back to My Kabo
              </a>
            </div>
          </div>
        ) : (
          <>
          {
             pauseBoxType === 'MAIN' &&
             <p className="font-cooper text-base font-bold mb-6">How would you like to continue?</p>
          }

           {
             pauseBoxType === 'MAIN' &&
          options.map((opt, i) => (
            opt &&
            <>
            <Radio
              key={opt.value + i}
              value={opt.value}
              text={opt.text}
              onChange={() => handleRadioChange(opt)}
              selected={pauseType === opt.value}
              className={i === options.length - 1 ? '' : 'mb-7'}
            />
            { opt.value === 'specific' && pauseUntil !== null && pauseType === 'specific' &&
            (<div className="bg-yellow-100 p-5 rounded-md mb-3">
                { subscription && subscription.next_billing_at &&
                  <p className="text-xl font-semibold mb-2">Next delivery date is
                    <span className="font-medium"> {new Date(subscription.next_billing_at * 1000).toDateString()}</span>
                  </p>
                }

                { delivery_starting_date_options && delivery_starting_date_options.length > 0 &&
                <p className="text-xl font-semibold mb-2">Next delivery date is
                  <span className="font-medium"> {new Date(delivery_starting_date_options[0].value * 1000).toDateString()}</span>
                </p>
                }
              <button
                className="text-green-600 text-base font-medium mt-2"
                onClick={() => setPauseBoxType('TIME')}
              >
                Edit Date
              </button>
            </div>)
            }
            </>
          ))
           }
          </>

        )}
        { pauseBoxType === 'MAIN' &&
        <div className="flex items-center mt-8">
        <button
          className="rounded-xl py-3 px-8 text-base font-bold bg-primary text-white"
          onClick={() =>
            pauseType === 'cancel' || pauseType === 'forever'
              ? setPauseBoxType('REASON')
              : setPauseBoxType('CONFIRM')
          }
        >
          {pauseType === 'cancel' || pauseType === 'forever'
            ? 'Next'
            : 'Confirm'}
        </button>
        <a className="ml-3 mb-0 text-primary font-messina font-bold" href={`/edit-plan/${dogIndex}`}>
          Select a different meal plan
        </a>
        </div>}
      </div>

      { pauseBoxType === 'TIME' && (
        <>
          <div className="flex mx-auto w-11/12 md:w-9/12 justify-between items-center">
            <div onClick={()=>cancelDateSelection()} className="cursor-pointer">
              <ArrowIcon />
            </div>
            <h2 className="text-xl leading-7 md:text-2xl md:leading-8 font-cooper text-center pr-1.75 w-full text-black">
              Choose your next delivery date
            </h2>
          </div>
          <div className="py-6 mx-auto">
            <div className="mb-4 max-w-80 mx-auto">
              <DatePicker
                dateFormat="YYYY-MM-DD"
                startDate
                selected={pauseUntil === null ? new Date() : pauseUntil}
                onChange={(date) => setPauseUntil(date)}
                inline
                useWeekdaysShort
                minDate={disablePastDates()}
                maxDate={disableFutureDates()}
                includeDates={getNextDeliveryDates()}
                highlightDates={getNextDeliveryDates()}
              />
            </div>
            {
                pauseUntil &&
                <p className="text-sm mb-4 font-messina text-center">Next delivery date is <b>{moment(pauseUntil).format('LL')}</b></p>
              }

            <div className="flex justify-center">
              <button
                className="rounded-xl py-3 px-8 text-base font-bold bg-primary text-white w-full max-w-41.25 mx-auto lg:max-w-80"
                onClick={handleDateSelection}
              >
                Pick Date
              </button>
            </div>
          </div>
        </>
      )}

      { pauseBoxType === 'REASON' &&
        <>
          <CancelReason
            reason={reason}
            setReason={setReason}
            dogName={currentDog.name}
            lastName={userName}
          />
          <button
            onClick={() => setPauseBoxType('CONFIRM')}
            className="rounded-xl mb-5 py-3 px-8 text-base font-bold bg-primary text-white"
          >
            Confirm
          </button>
        </>
      }

      { pauseBoxType === 'CONFIRM' ?
        !subscriptionCancel && !isSubscriptionPaused ?
          <GuideOptions
            pauseMeal={pauseMeal}
            cancelMeal={cancelMeal}
            pauseType={pauseType}
          />
        :
        subscriptionCancel && <ConfirmationMessage />
      : null }
    </React.Fragment>
  );
};

export default CancelOptions;

