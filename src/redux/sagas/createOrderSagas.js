import { takeEvery, put, call } from "redux-saga/effects";
import { CREATE_ORDER_REQUEST } from "../constants/actionTypes";
import { createOrder } from "../../services/dataUser/createOrder";
import { createOrderSuccess, createOrderFailure } from "../actions/authActions";

function* createOrderSagas(action) {
   try {
      const { formData } = action.payload;
      const response = yield call(createOrder, formData);
      console.log(response);
      yield put(createOrderSuccess(response.newOrder));
   } catch (error) {
      yield put({
         type: createOrderFailure,
         payload: error.message,
      });
   }
}

function* watchCreateOrderSagas() {
   yield takeEvery(CREATE_ORDER_REQUEST, createOrderSagas);
}

export default watchCreateOrderSagas;
