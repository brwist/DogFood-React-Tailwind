/* eslint-disable semi */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userActions } from '../../actions';
import { AccountDetails } from '../../components/profile/account-details';
import Billing from '../../components/profile/billing';
import Cupon from '../../components/profile/cupon';
import { DeliveryAddress } from '../../components/profile/delivery-address';
import Loader from '../../loaders/profileLoader';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* eslint-disable react/no-unused-state */
      nextExpanded: false,
      mealExpanded: false,
      frequencyExpanded: false,
    };
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    const { getAccountData, getSubscriptionData, getBreedData } = this.props;
    getAccountData();
    getSubscriptionData();
    getBreedData();
  }

  openModal(name) {
    const { [name]: actualField } = this.state;
    this.setState({
      [name]: !actualField,
    });
  }

  render() {
    const {
      user,
      dogs,
      updatePaymentMethod,
      addCoupon,
      couponResponse,
      userError,
      setBillingAddress,
      showManageSubscriptionsBox,
      openSubscriptionManagementModal,
      openUpdatePaymentModal,
    } = this.props;
    if (!dogs.length || !user.shipping_address) return <Loader />;

    const detailsCard = 'container pb-4  shadow-profileBoxes p-10 rounded-xl';
    return (
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-7 pb-10">
        <div className={detailsCard}>
          <AccountDetails user={user} dogs={dogs} />
        </div>
        <div className={detailsCard}>
          <Billing
            user={user}
            open_payment_modal={user.open_payment_modal}
            openUpdatePaymentModal={openUpdatePaymentModal}
            payment_billing_address={user.payment_billing_address}
            setBillingAddress={setBillingAddress}
            payment_method_updated={user.payment_method_updated}
            updatePaymentMethod={updatePaymentMethod}
            updating_payment_method={user.updating_payment_method}
            showManageSubscriptionsBox={showManageSubscriptionsBox}
            openSubscriptionManagementModal={openSubscriptionManagementModal}
          />
        </div>
        <div className={detailsCard}>
          <DeliveryAddress user={user} deliveryAddress={user.shipping_address} />
        </div>
        <div className={detailsCard}>
          <Cupon
            user={user}
            deliveryAddress={user.shipping_address}
            addCoupon={addCoupon}
            couponResponse={couponResponse}
            userError={userError}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAccountData: () => dispatch(userActions.getAccountData()),
  getSubscriptionData: () => dispatch(userActions.getSubscriptionData()),
  getBreedData: () => dispatch(userActions.getBreedData()),
  openUpdatePaymentModal: (payload) => dispatch(userActions.openUpdatePaymentModal(payload)),
  setBillingAddress: (payload) => dispatch(userActions.setBillingAddress(payload)),
  updatePaymentMethod: (payload) => dispatch(userActions.updatePaymentMethod(payload)),
  addCoupon: (payload) => dispatch(userActions.applyCoupon(payload)),
  openSubscriptionManagementModal: (payload) => {
    const { openSubscriptionManagementModal } = userActions;
    dispatch(openSubscriptionManagementModal(payload));
  },
});

const mapStateToProps = (state) => {
  const { user } = state;
  const {
    subscriptions,
    dogs,
    couponResponse,
    errorMessage,
    showManageSubscriptionsBox,
  } = state.user;
  return {
    user,
    subscriptions,
    dogs,
    couponResponse,
    userError: errorMessage,
    showManageSubscriptionsBox,
  };
};
ProfilePage.defaultProps = {
  showManageSubscriptionsBox: false,
  updating_payment_method: '',
  dogs: '',
  updatePaymentMethod: '',
  addCoupon: '',
  couponResponse: '',
  userError: '',
};

ProfilePage.propTypes = {
  openUpdatePaymentModal: PropTypes.func.isRequired,
  openSubscriptionManagementModal: PropTypes.func.isRequired,
  showManageSubscriptionsBox: PropTypes.bool,
  updating_payment_method: PropTypes.string,
  setBillingAddress: PropTypes.func.isRequired,
  dogs: PropTypes.shape([]),
  updatePaymentMethod: PropTypes.string,
  addCoupon: PropTypes.string,
  couponResponse: PropTypes.string,
  userError: PropTypes.string,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  getAccountData: PropTypes.func.isRequired,
  getSubscriptionData: PropTypes.func.isRequired,
  getBreedData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
