import { takeLatest, call, put } from "redux-saga/effects";

import { userConstants } from "../constants";
import { authenticationService } from "../services";

function* loginSaga(action) {
  try {
    const payload = yield call(authenticationService.login, action.payload);
    yield put({ type: userConstants.LOGIN_SUCCESS, payload });
  } catch (e) {
    yield put({ type: userConstants.LOGIN_FAILURE, payload: e });
  }
}

function* forgetPassword(action) {
  try {
    const payload = yield call(authenticationService.forgetPassword, action.payload);
    yield put({ type: userConstants.FORGET_PASSWORD_SUCCESS, payload });
  } catch (error) {
    yield put({ type: userConstants.FORGET_PASSWORD_FAILED, payload: error });
  }
}

function* resetPassword(action) {
  try {
    const payload = yield call(authenticationService.resetPassword, action.payload);
    yield put({ type: userConstants.RESET_PASSWORD_SUCCESS, payload });
  } catch (error) {
    yield put({ type: userConstants.RESET_PASSWORD_FAILED, payload: error });
  }
}

export default function* account() {
  yield takeLatest(userConstants.LOGIN_REQUEST, loginSaga);
  yield takeLatest(userConstants.FORGET_PASSWORD_REQUEST, forgetPassword);
  yield takeLatest(userConstants.RESET_PASSWORD_REQUEST, resetPassword);
}
