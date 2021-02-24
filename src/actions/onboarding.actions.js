import { onboardingContstants } from "../constants";

const getOnboardingData = () => ({
  type: onboardingContstants.GET_ONBOARDING_DATA,
});

const getDogsFromForm = (dogs) => ({
  type: onboardingContstants.GET_DOGS_FROM_FORM,
  payload: dogs,
});

const getOnboardingDetails = () => ({
  type: onboardingContstants.GET_ONBOARDING_DETAILS,
});

const createTempUser = (data) => ({
  type: onboardingContstants.CREATE_TEMP_USER,
  payload: data,
});

const updateTempUser = (data) => ({
  type: onboardingContstants.UPDATE_TEMP_USER,
  payload: data,
});

export const onboardingActions = {
  getOnboardingData,
  getDogsFromForm,
  getOnboardingDetails,
  createTempUser,
  updateTempUser,
};
