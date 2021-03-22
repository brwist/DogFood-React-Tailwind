import React, { Component } from 'react';
import DogSelector from '../account/dog-selector';
import CancelOptions from './cancel-options';
import GuideOptions from './guide-options';

class CancelSubscription extends Component {
  state = {
    dogIndex: 0,
  };

  setDog = (i) => {
    this.setState({
      dogIndex: i,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="grid lg:grid-cols-2 xs:grid-cols-1">
        <div className="bg-green-50 pt-5 pl-6 pr-6 md:hidden">
                <h3 className="font-medium text-xl">Manage Subscription</h3>
                <p className="mt-8 text-3xl font-cooper">
                  We'll be waiting for you to come back
                </p>
                <div className="mt-8 flex">
                  {this.props.dogs && this.props.dogs.length > 1 && (
                    <DogSelector
                      dogs={this.props.dogs}
                      setDog={this.setDog}
                      dogIndex={this.state.dogIndex}
                    />
                  )}
                </div>
              </div>
          <div>
            <img className="w-full" src="https://images.pexels.com/photos/220938/pexels-photo-220938.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
          </div>
          <div>
            <div className="w-auto">
              <div className="bg-green-50 pt-5 pl-12 hidden md:block">
                <h3 className="font-medium text-xl">Manage Subscription</h3>
                <p className="mt-8 text-3xl font-cooper">
                  We'll be waiting for you to come back
                </p>
                <div className="mt-8 flex">
                  {this.props.dogs && this.props.dogs.length > 1 && (
                    <DogSelector
                      dogs={this.props.dogs}
                      setDog={this.setDog}
                      dogIndex={this.state.dogIndex}
                    />
                  )}
                </div>
              </div>
             
              <div className="mt-10 md:px-10 px-4">
                {this.props.step === 1 && <GuideOptions handleStep={this.props.handleStep}/>}

                {this.props.step === 2 &&
                <>
               
                <CancelOptions
                  currentDog={
                    this.props.dogs.length > 1 &&
                    this.props.dogs[this.state.dogIndex]
                  }
                  userName={this.props.userName}
                  cancelSubscription={this.props.cancelSubscription}
                  pauseSubscription={this.props.pauseSubscription}
                  subscriptionCancel={this.props.subscriptionCancel}
                  isSubscriptionPaused={this.props.isSubscriptionPaused}
                /></>
                }
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CancelSubscription;
