import { takeEvery, put, call, select, delay } from "redux-saga/effects";
import { USER_ME_REQUEST } from "../constants/actionTypes";
import { getMeApi } from "../../services/dataUser/getMeApi";
import {
   userMeRequest,
   userMeSuccess,
   userMeFailed,
} from "../actions/authActions";

function* userMeSaga() {
   try {
      const response = yield call(getMeApi);
      yield put(userMeSuccess(response.data));
   } catch (error) {
      yield put(userMeFailed(error));
   }
}

function* watchUserMe() {
   yield takeEvery(USER_ME_REQUEST, userMeSaga);
}

export default watchUserMe;
