// src/redux/sagas/orderSaga.js
import { call, put, takeEvery } from "redux-saga/effects";
import { UPDATE_ORDER_REQUEST } from "../constants/actionTypes";
import { updateOrderApi } from "../../services/dataUser/updateOrderApi";
import { updateOrderSuccess, updateOrderFailure } from "../actions/authActions";

function* updateOrderSagas(action) {
   try {
      const { idOrder, orderData } = action.payload;
      const updatedOrder = yield call(updateOrderApi, idOrder, orderData);
      yield put(updateOrderSuccess(updatedOrder));
   } catch (error) {
      yield put(updateOrderFailure(error.message));
   }
}

function* watchUpdateOrder() {
   yield takeEvery(UPDATE_ORDER_REQUEST, updateOrderSagas);
}

export default watchUpdateOrder;
