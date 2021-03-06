import { userConstants, otherConstants } from '../constants';

const couponResponse = localStorage.getItem('couponResponse')
  ? JSON.parse(localStorage.getItem('couponResponse'))
  : null;
const initialState = {
  subscriptions: {},
  dogs: [],
  recipes: [],
  orders: [],
  error: false,
  loading: true,
  loadingKeys: {},
  estimate: null,
  open_payment_modal: false,
  updating_payment_method: false,
  payment_method_updated: false,
  payment_billing_address: {},

  open_skip_delivery_modal: false,
  skipping_dog_delivery: false,
  couponResponse,
  couponResponsePerDog: null,

  loading_notifications: false,
  user_notifications: [],

  subscriptionCancel: false,
  pausing_subscription: false,
  isSubscriptionPaused: false,

  showManageSubscriptionsBox: false,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.ACCOUNT_DATA_LOADED:
      return {
        ...state,
        ...action.payload,
      };
    case userConstants.RECIPE_DATA_LOADED:
      return {
        ...state,
        ...action.payload,
      };
    case userConstants.BREED_DATA_LOADED:
      return {
        ...state,
        ...action.payload,
      };
    case userConstants.SUBSCRIPTION_DATA_REQUESTED:
      return {
        ...state,
        subLoading: true,
      };
    case userConstants.SUBSCRIPTION_DATA_LOADED:
      return {
        ...state,
        ...action.payload,
        subLoading: false,
      };
    case userConstants.ESTIMATE_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case userConstants.ESTIMATE_LOADED:
      return {
        ...state,
        estimate: { ...action.payload },
        loading: false,
      };
    case userConstants.UPDATE_DELIVERY_FREQUENCY_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: false,
      };
    case userConstants.UPDATE_DELIVERY_FREQUENCY_FAILURE:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: true,
      };
    case userConstants.UPDATE_DELIVERY_FREQUENCY_REQUESTED:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case userConstants.DELIVERY_UPDATE_REQUESTED:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case userConstants.DELIVERY_UPDATE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: false,
      };
    case userConstants.DELIVERY_UPDATE_FAILURE:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: true,
      };

    case userConstants.PAUSE_SUBSCRIPTION_REQUESTED:
      return {
        ...state,
        pausing_subscription: true,
      };

    case userConstants.PAUSE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        pausing_subscription: false,
        isSubscriptionPaused: true,
      };

    case userConstants.UNPAUSE_SUBSCRIPTION_REQUESTED:
      return {
        ...state,
        ...action.payload,
        loadingKeys: {
          ...state.loadingKeys,
          [userConstants.UNPAUSE_SUBSCRIPTION_REQUESTED]: true,
        },
        error: false,
      };
    case userConstants.UNPAUSE_SUBSCRIPTION_SUCCESS: {
      let nextState = { ...state };
      if (action.payload.subscription.id) {
        //setting new state directly in subscriptions object
        nextState.subscriptions[action.payload.subscription.id] = {
          ...nextState.subscriptions[action.payload.subscription.id],
          ...action.payload.subscription,
        };
      }
      return {
        ...nextState,
        ...action.payload,
        loadingKeys: {
          ...state.loadingKeys,
          [userConstants.UNPAUSE_SUBSCRIPTION_REQUESTED]: false,
        },
        error: false,
      };
    }
    case userConstants.UNPAUSE_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        loadingKeys: {
          ...state.loadingKeys,
          [userConstants.UNPAUSE_SUBSCRIPTION_REQUESTED]: false,
        },
      };
    case otherConstants.REQUEST_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.payload,
      };
    case userConstants.UPDATE_PWD_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case userConstants.ORDER_DATA_LOADED:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case userConstants.ORDER_DATA_REQUESTED:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case userConstants.UPDATE_PWD_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case userConstants.UPDATE_PWD_ALERT_CLEAR:
      return {
        ...state,
        pwd_update_success: ' ',
        pwd_alert: ' ',
      };
    case userConstants.OPEN_UPDATE_PAYMENT_MODAL_SUCCESS:
      return {
        ...state,
        open_payment_modal: action.payload,
      };

    case userConstants.SET_BILLING_ADDRESS_SUCCESS:
      return {
        ...state,
        payment_billing_address: action.payload,
      };
    case userConstants.UPDATE_PAYMENT_METHOD:
      return {
        ...state,
        updating_payment_method: true,
      };

    case userConstants.UPDATE_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        updating_payment_method: false,
        open_payment_modal: !state.open_payment_modal,
        payment_method_updated: true,
        payment_billing_address: {
          stripe_token: '',
          same_as_shipping_address: '',
          billing_first_name: '',
          billing_last_name: '',
          billing_street_address: '  ',
          billing_apt_suite: '',
          billing_city: '',
          billing_postal_code: '',
          billing_phone_number: '',
        },
      };

    case userConstants.UPDATE_PAYMENT_METHOD_FAILED:
      return {
        ...state,
        updating_payment_method: false,
      };

    case userConstants.OPEN_SKIP_DELIVERY_MODAL_SUCCESS:
      return {
        ...state,
        open_skip_delivery_modal: action.payload,
      };

    case userConstants.SKIP_DOG_DELIVERY:
      return {
        ...state,
        skipping_dog_delivery: true,
      };

    case userConstants.SKIP_DOG_DELIVERY_SUCCESS:
      return {
        ...state,
        skipping_dog_delivery: false,
        open_skip_delivery_modal: !state.open_skip_delivery_modal,
      };

    case userConstants.SKIP_DOG_DELIVERY_FAILED:
      return {
        ...state,
        skipping_dog_delivery: false,
      };

    case userConstants.CANCEL_SUBSCRIPTION_REQUESTED: {
      return {
        ...state,
        cancelationInfo: action.payload,
        loadingKeys: {
          ...state.loadingKeys,
          [userConstants.CANCEL_SUBSCRIPTION_REQUESTED]: true,
        },
        error: false,
      };
    }
    case userConstants.CANCEL_SUBSCRIPTION_SUCCESS: {
      let nextState = { ...state };
      if (action.payload.subscription.id) {
        nextState.subscriptions[action.payload.subscription.id] = {
          ...nextState.subscriptions[action.payload.subscription.id],
          ...action.payload.subscription,
        };
      }
      return {
        ...nextState,
        error: false,
        subscriptionCancel: true,
      };
    }

    case userConstants.RESET_ERROR:
      return {
        ...state,
        error: false,
        errorMessage: '',
      };
    case userConstants.RESET_USER_LOADING:
      return {
        ...state,
        loading: false,
      };
    case userConstants.APPLY_COUPON:
      return {
        ...state,
        loading: true,
        errorMessage: '',
      };
    case userConstants.APPLY_COUPON_SUCCESS:
      localStorage.setItem('couponResponse', JSON.stringify(action.payload));

      return {
        ...state,
        loading: false,
        errorMessage: '',
        couponResponse: action.payload,
      };
    case userConstants.APPLY_COUPON_FAILURE:
      localStorage.removeItem('couponResponse');
      return {
        ...state,
        errorMessage: 'Invalid coupon',
        loading: false,
      };
    case userConstants.APPLY_COUPON_PER_DOG:
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };
    case userConstants.APPLY_COUPON_PER_DOG_SUCCESS:
      localStorage.setItem("couponResponsePerDog", JSON.stringify(action.payload));

      return {
        ...state,
        loading: false,
        errorMessage: "",
        couponResponsePerDog: action.payload,
      };
    case userConstants.APPLY_COUPON_PER_DOG_FAILURE:
      localStorage.removeItem("couponResponsePerDog");
      return {
        ...state,
        errorMessage: "Invalid coupon",
        loading: false,
      };
    case userConstants.SET_USER_LOADING: {
      let newState = state;
      if (action.key) {
        if (!newState.loadingKeys[action.key] && action.value) {
          newState = { ...state };
          newState.loadingKeys[action.key] = action.value;
        } else if (
          !action.value &&
          newState.loadingKeys.hasOwnProperty(action.key)
        ) {
          newState = { ...state };
          delete newState.loadingKeys[action.key];
        }
      }
      return newState;
    }

    case userConstants.GET_USER_NOTIFICATIONS:
      return {
        ...state,
        loading_notifications: true,
      };

    case userConstants.GET_USER_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading_notifications: false,
        user_notifications: action.payload,
      };

    case userConstants.GET_USER_NOTIFICATIONS_FAILED:
      return {
        ...state,
        loading_notifications: false,
      };

    case userConstants.OPEN_SUBSCRIPTION_MANAGEMENT_MODAL_SUCCESS:
      return {
        ...state,
        showManageSubscriptionsBox: !state.showManageSubscriptionsBox,
        isSubscriptionPaused: false,
      };
    default:
      return state;
  }
};
