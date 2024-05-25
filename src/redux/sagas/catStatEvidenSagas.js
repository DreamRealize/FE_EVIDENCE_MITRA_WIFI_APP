// src/sagas/categoryBankSagas.js
import { takeEvery, put, call } from "redux-saga/effects";
import { FETCH_STATUS_EVIDEN_REQUEST } from "../constants/actionTypes";
import { getCatStatEviden } from "../../services/dataUser/getCatStatEviden"; // Implement this service
import {
   fetchStatusEvidenSuccess,
   fetchStatusEvidenFailed,
} from "../actions/authActions";

function* catStatEvidenSagas() {
   try {
      const categories = yield call(getCatStatEviden); // Call the API or database function
      yield put(fetchStatusEvidenSuccess(categories.data));
   } catch (error) {
      yield put(fetchStatusEvidenFailed(error));
   }
}

function* watchCatStatEvidenSagas() {
   yield takeEvery(FETCH_STATUS_EVIDEN_REQUEST, catStatEvidenSagas);
}

export default watchCatStatEvidenSagas;
