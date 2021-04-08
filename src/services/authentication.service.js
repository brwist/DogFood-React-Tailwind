import { request } from "../utils";
import { endpointConstants } from "../constants";

const login = ({ email, password }) => {
  const requestOptions = request.options("POST", JSON.stringify({ email, password }), false, true);

  return fetch(endpointConstants.LOGIN, requestOptions)
    .then(request.handleResponse)
    .then((res) => {
      // login successful if there's a jwt token in the response
      if (res.token) {
        // store user details and jwt token in local storage
        const user = { email: res.email, token: res.token };
        localStorage.setItem("user", JSON.stringify(user));
        window.location = "/";
      }

      return res;
    });
};

const forgetPassword = ({ email }) => {
  const requestOptions = request.options("POST", JSON.stringify({ email }), false, true);
  return fetch(endpointConstants.FORGET_PASSWORD, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const resetPassword = ({ resetPasswordToken, password, confirmedPassword }) => {
  const requestOptions = request.options(
    "POST",
    JSON.stringify({
      reset_password_token: resetPasswordToken,
      password,
      password_confirmation: confirmedPassword,
    }),
    false,
    true,
  );
  return fetch(endpointConstants.RESET_PASSWORD, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

export const authenticationService = {
  login,
  forgetPassword,
  resetPassword,
};
