import { takeEvery, put, call } from "redux-saga/effects";
import { DELETE_EVIDENCE_REQUEST } from "../constants/actionTypes";
import { deleteEvidenceApi } from "../../services/dataUser/deleteEvidenceApi";
import {
   deleteEvidenceSuccess,
   deleteOrderFailed,
} from "../actions/authActions";

function* deleteEvidenceSagas(action) {
   try {
      const { idEviden } = action.payload;
      const response = yield call(deleteEvidenceApi, idEviden);
      yield put(deleteEvidenceSuccess(response));
   } catch (error) {
      yield put({
         type: deleteOrderFailed,
         payload: error.message,
      });
   }
}

function* watchDeleteEvidenceSagas() {
   yield takeEvery(DELETE_EVIDENCE_REQUEST, deleteEvidenceSagas);
}

export default watchDeleteEvidenceSagas;
