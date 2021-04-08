import { userConstants } from "../constants";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? {
    loggedIn: true,
    user,
    error: false,
    errorMessage: "",
    authLoading: false,
  }
  : {
    forgetPassword: {
      isLoading: false,
      success: false,
      error: false,
      errorMessage: null,
      successMessage: null,
    },
    resetPassword: {
      isLoading: false,
      success: false,
      error: false,
      errorMessage: null,
      successMessage: null,
    },
  };

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        user: action.payload.user,
        error: false,
        errorMessage: "",
        authLoading: true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        error: false,
        errorMessage: "",
        authLoading: false,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
        authLoading: false,
      };
    case userConstants.FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        forgetPassword: {
          isLoading: true,
          success: false,
          error: false,
          errorMessage: null,
          successMessage: null,
        },
      };
    case userConstants.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        forgetPassword: {
          isLoading: false,
          success: true,
          error: false,
          errorMessage: null,
          successMessage: action.payload.message,
        },
      };
    case userConstants.FORGET_PASSWORD_FAILED:
      return {
        ...state,
        forgetPassword: {
          isLoading: false,
          success: false,
          error: true,
          errorMessage: action.payload.message,
          successMessage: null,
        },
      };

    case userConstants.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPassword: {
          isLoading: true,
          success: false,
          error: false,
          errorMessage: null,
          successMessage: null,
        },
      };
    case userConstants.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassword: {
          isLoading: false,
          success: true,
          error: false,
          errorMessage: null,
          successMessage: action.payload.message,
        },
      };
    case userConstants.RESET_PASSWORD_FAILED:
      return {
        ...state,
        resetPassword: {
          isLoading: false,
          success: false,
          error: true,
          errorMessage: action.payload.message,
          successMessage: null,
        },
      };
    case userConstants.LOGOUT:
      localStorage.removeItem("couponResponse");
      localStorage.removeItem("user");

      return {};
    default:
      return state;
  }
};
