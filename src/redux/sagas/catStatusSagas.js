// src/sagas/categoryBankSagas.js
import { takeEvery, put, call } from "redux-saga/effects";
import { FETCH_CATEGORY_STATUS_REQUEST } from "../constants/actionTypes";
import { getCatStatOrder } from "../../services/dataUser/getCatStatOrder"; // Implement this service
import {
   fetchCategoryStatusSuccess,
   fetchCategoryStatusFailed,
} from "../actions/authActions";

function* catStatusSagas() {
   try {
      const categories = yield call(getCatStatOrder); // Call the API or database function
      yield put(fetchCategoryStatusSuccess(categories.data));
   } catch (error) {
      yield put(fetchCategoryStatusFailed(error));
   }
}

function* watchStatusSagas() {
   yield takeEvery(FETCH_CATEGORY_STATUS_REQUEST, catStatusSagas);
}

export default watchStatusSagas;
