import { takeEvery, put, call } from "redux-saga/effects";
import { EVIDEN_REQUEST } from "../constants/actionTypes";
import { getEviden } from "../../services/dataUser/getEviden";
import { evidenSuccess, evidenFailed } from "../actions/authActions";

function* evidenSagas(action) {
   try {
      const { page } = action.payload;
      const response = yield call(getEviden, page);
      yield put(evidenSuccess(response));
   } catch (error) {
      yield put(evidenFailed(error));
   }
}

function* watchEvidenSagas() {
   yield takeEvery(EVIDEN_REQUEST, evidenSagas);
}

export default watchEvidenSagas;
