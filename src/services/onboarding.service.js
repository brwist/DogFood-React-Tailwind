import { request } from "../utils";
import { endpointConstants } from "../constants";

const getOnboardingData = () => {
  const requestOptions = request.options("GET", {}, true, false);

  return fetch(endpointConstants.ONBOARDING_STARTER_STEP, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const getOnboardingDetails = () => {
  const requestOptions = request.options("GET", {}, true, false);

  return fetch(endpointConstants.ONBOARDING_DETAILS_STEP, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const createTempUser = (data) => {
  const requestOptions = request.options(
    "POST",
    JSON.stringify(data),
    true,
    true
  );

  return fetch(endpointConstants.CREATE_TEMP_USER, requestOptions)
    .then(request.handleResponse)
    .then((res) => res);
};

const updateTempUser = (data) => {
  console.log("from service", data);
  const requestOptions = request.options(
    "PUT",
    JSON.stringify(data.details),
    true,
    true
  );

  return fetch(
    `${endpointConstants.UPDATE_TEMP_USER}/${data.id}`,
    requestOptions
  )
    .then(request.handleResponse)
    .then((res) => res);
};

export const onboardingService = {
  getOnboardingData,
  getOnboardingDetails,
  createTempUser,
  updateTempUser,
};
