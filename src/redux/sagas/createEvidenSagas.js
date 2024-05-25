import { takeEvery, put, call } from "redux-saga/effects";
import { CREATE_EVIDEN_REQUEST } from "../constants/actionTypes";
import { createEvideApi } from "../../services/dataUser/createEvideApi";
import {
   createEvidenSuccess,
   createEvidenFailure,
} from "../actions/authActions";

function* createEvidenSagas(action) {
   try {
      const { formData } = action.payload;
      const response = yield call(createEvideApi, formData);
      console.log(response);
      yield put(createEvidenSuccess(response.newEviden));
   } catch (error) {
      yield put({
         type: createEvidenFailure,
         payload: error.message,
      });
   }
}

function* watchCreateEvidenSagas() {
   yield takeEvery(CREATE_EVIDEN_REQUEST, createEvidenSagas);
}

export default watchCreateEvidenSagas;
