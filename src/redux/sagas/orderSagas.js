import { takeEvery, put, call } from "redux-saga/effects";
import { ORDER_REQUEST } from "../constants/actionTypes";
import { getOrderApi } from "../../services/dataUser/getOrderApi";
import { orderSuccess, orderFailed } from "../actions/authActions";

function* orderSagas(action) {
   try {
      const { page } = action.payload;
      const response = yield call(getOrderApi, page);
      yield put(orderSuccess(response));
   } catch (error) {
      yield put(orderFailed(error));
   }
}

function* watchOrderSagas() {
   yield takeEvery(ORDER_REQUEST, orderSagas);
}

export default watchOrderSagas;
