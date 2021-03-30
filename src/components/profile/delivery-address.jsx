import React from 'react';
import Button from "../global/button.jsx";
import DeliveryAddressModal from "./delivery-address-modal";
import DeliveryAddressIcon from '../../assets/images/delivery-address.svg';

class DeliveryAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryAddress: {
        first_name: '',
        last_name: '',
        line1: '',
        line2: '',
        city: '',
        zip: '',
        delivery_instructions: '',
      },
      isAddressModalOpen: false,
    };
    this.editDeliveryAddress = this.editDeliveryAddress.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
      return { deliveryAddress: props.deliveryAddress }
  }
  componentDidMount() {
    this.setState({
      deliveryAddress: {
        ...this.state.deliveryAddress,
        ...this.props.deliveryAddress,
      },
    });
  }

  editDeliveryAddress() {
    this.setState({ isAddressModalOpen: true });
  }

  toggleAddressModal = () => {
    this.setState({ isAddressModalOpen: !this.state.isAddressModalOpen });
  };

  render() {
    const { deliveryAddress } = this.state;
    console.log(deliveryAddress)
    return (
      <>
        <div className="rounded-xl shadow-md bg-white">
          <div className="flex shadow-sm text-2xl font-cooper font-semibold mb-3 border-b px-5 py-3">
            <img src={DeliveryAddressIcon} />
            <span className="ml-2">Delivery Address</span>
          </div>
          <div className="px-5 pt-3 pb-10">
            <div>
              {deliveryAddress.line2 && (
                <span className="inline-block">
                  Apt #{deliveryAddress.line2},
                </span>
              )}

              {deliveryAddress.line1 && (
                <span className="inline-block">{deliveryAddress.line1},</span>
              )}
              <br />
              {deliveryAddress.city && (
                <span className="inline-block">{deliveryAddress.city},</span>
              )}
              {deliveryAddress.state_code && (
                <span className="inline-block">&nbsp;{deliveryAddress.state_code}</span>
              )}
              {deliveryAddress.zip && (
                <span className="inline-block">&nbsp;{deliveryAddress.zip}</span>
              )}
              {deliveryAddress.delivery_instructions && (
                <div>{deliveryAddress.delivery_instructions},</div>
              )}
            </div>

            {deliveryAddress.delivery_instructions && (
              <div>
                Special Instructions: {deliveryAddress.delivery_instructions}
              </div>
            )}

            <div className="pt-2 pb-5">
              <Button
                text="Edit"
                onClick={this.editDeliveryAddress}
                styles="focus:outline-none w-full"
              />
            </div>
            <DeliveryAddressModal
              isOpen={this.state.isAddressModalOpen}
              toggle={this.toggleAddressModal}
              deliveryAddress={deliveryAddress}
            />
          </div>
        </div>
      </>
    );
  }
}

export default DeliveryAddress;
