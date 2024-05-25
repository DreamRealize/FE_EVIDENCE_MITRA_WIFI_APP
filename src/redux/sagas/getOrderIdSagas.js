import { takeLatest, put, call } from "redux-saga/effects";
import { GET_ORDER_BY_ID_REQUEST } from "../constants/actionTypes";
import { orderGetById } from "../../services/dataUser/orderGetById";
import {
   getOrderByIdSuccess,
   getOrderByIdFailure,
} from "../actions/authActions";

function* getOrderIdSagas(action) {
   try {
      const response = yield call(orderGetById, action.payload);
      yield put(getOrderByIdSuccess(response.data));
   } catch (error) {
      yield put(getOrderByIdFailure(error.message));
   }
}

function* watchGetOrderById() {
   yield takeLatest(GET_ORDER_BY_ID_REQUEST, getOrderIdSagas);
}

export default watchGetOrderById;
