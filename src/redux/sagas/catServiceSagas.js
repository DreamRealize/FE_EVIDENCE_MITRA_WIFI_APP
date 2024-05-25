// src/sagas/categoryBankSagas.js
import { takeEvery, put, call } from "redux-saga/effects";
import { FETCH_CATEGORY_SERVICE_REQUEST } from "../constants/actionTypes";
import { getCatService } from "../../services/dataUser/getCatService"; // Implement this service
import {
   fetchCategoryServiceSuccess,
   fetchCategoryServiceFailed,
} from "../actions/authActions";

function* catServiceSagas() {
   try {
      const categories = yield call(getCatService); // Call the API or database function
      yield put(fetchCategoryServiceSuccess(categories.data));
   } catch (error) {
      yield put(fetchCategoryServiceFailed(error));
   }
}

function* watchCategoryService() {
   yield takeEvery(FETCH_CATEGORY_SERVICE_REQUEST, catServiceSagas);
}

export default watchCategoryService;
