import React, { useEffect, useState } from 'react';
import ConfirmationModal from './confirmation-modal';

const GuideOptions = ({ pauseMeal, cancelMeal, pauseType }) => {
    const [isChecked, setIsChecked] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsOpen(!isOpen)
        }, 3000)
    }, [])

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <React.Fragment>
            <div className="grid grid-cols-1">
                <p className="lg:text-4xl sm:text-2xl font-bold font-cooper">Maybe We Can Help You?</p>
                <p className="mt-5 font-messina">
                Are you sure you are looking to pause Herbert’s plan?
                If you want to change your <br/>
                upcoming delivery date, we suggest you click “Edit Delivery Date”.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5 font-messina">
                <div>
                    <button className="rounded-lg mt-10 py-2 w-full border-2 border-green text-primary focus:outline-none">
                        Contact Us
                    </button>
                </div>
                <div>
                    <button className="rounded-lg mt-10 py-2 w-full border-2 border-green text-primary focus:outline-none">
                        Edit Delivery Date
                    </button>
                </div>
                <div>
                    <button className="rounded-lg mt-10 py-2 w-full border-2 border-green text-primary focus:outline-none">
                        Edit a Meal Plan
                    </button>
                </div>
                <div>
                    <button className="rounded-lg mt-10 py-2 w-full border-2 border-green text-primary focus:outline-none">
                        Edit Delivery Frequency
                    </button>
                </div>
            </div>

            <div className="flex mt-10 font-messina">
                <input
                    type="checkbox"
                    className="mt-1.5 mr-2"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                />
                <label>I understand that by proceeding, I will be pausing my subscription to Kabo.</label>
            </div>

            <div className="flex mt-10 font-messina">
                {pauseType === "forever" || pauseType === "cancel" ?
                <button
                    className={!isChecked ?
                    "px-10 py-3 bg-gray-300 text-green-600 font-medium rounded-lg focus:outline-none" :
                    "px-10 py-3 bg-green-600 text-white font-medium rounded-lg focus:outline-none"}
                    onClick={pauseType === 'forever' ? pauseMeal : cancelMeal}
                    disabled={!isChecked}
                >
                Confirm
                </button>
                :
                <button
                    className={!isChecked ?
                    "px-10 py-3 bg-gray-300 text-green-600 font-medium rounded-lg focus:outline-none" :
                    "px-10 py-3 bg-green-600 text-white font-medium rounded-lg focus:outline-none"}
                    onClick={pauseMeal}
                    disabled={!isChecked}
                >
                Confirm
                </button>
                }
            </div>

            <ConfirmationModal
                isOpen={isOpen}
                toggle={toggle}
            />
        </React.Fragment>
     );
}

export default GuideOptions;
