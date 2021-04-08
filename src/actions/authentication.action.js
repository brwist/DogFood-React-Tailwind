import { userConstants } from "../constants";

const login = (user) => ({ type: userConstants.LOGIN_REQUEST, payload: user });

const forgetPassword = ({ email }) => ({
  type: userConstants.FORGET_PASSWORD_REQUEST,
  payload: { email },
});

const resetPassword = ({ password, confirmedPassword, resetPasswordToken }) => ({
  type: userConstants.RESET_PASSWORD_REQUEST,
  payload: { password, confirmedPassword, resetPasswordToken },
});

const logout = () => ({ type: userConstants.LOGOUT });

export const authenticationActions = {
  login,
  logout,
  forgetPassword,
  resetPassword,
};
