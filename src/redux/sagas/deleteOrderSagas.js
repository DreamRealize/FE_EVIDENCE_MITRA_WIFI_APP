import { takeEvery, put, call } from "redux-saga/effects";
import { DELETE_ORDER_REQUEST } from "../constants/actionTypes";
import { deleteOrderApi } from "../../services/dataUser/deleteOrderApi";
import { deleteOrderSuccess, deleteOrderFailed } from "../actions/authActions";

function* deleteOrderSagas(action) {
   try {
      const { idOrder } = action.payload;
      const response = yield call(deleteOrderApi, idOrder);
      yield put(deleteOrderSuccess(response));
   } catch (error) {
      yield put({
         type: deleteOrderFailed,
         payload: error.message,
      });
   }
}

function* watchDeleteOrderSagas() {
   yield takeEvery(DELETE_ORDER_REQUEST, deleteOrderSagas);
}

export default watchDeleteOrderSagas;
