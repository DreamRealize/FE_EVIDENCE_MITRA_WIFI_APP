// src/redux/sagas/orderSaga.js
import { call, put, takeEvery } from "redux-saga/effects";
import { UPDATE_EVIDENCE_REQUEST } from "../constants/actionTypes";
import { updateEvidenceApi } from "../../services/dataUser/updateEvidenceApi";
import {
   updateEvidenceSuccess,
   updateEvidenceFailure,
} from "../actions/authActions";

function* updateEvidenceSagas(action) {
   try {
      const { idEviden, evidenData } = action.payload;
      const updateEviden = yield call(updateEvidenceApi, idEviden, evidenData);
      yield put(updateEvidenceSuccess(updateEviden));
   } catch (error) {
      yield put(updateEvidenceFailure(error.message));
   }
}

function* watchUpdateEvidence() {
   yield takeEvery(UPDATE_EVIDENCE_REQUEST, updateEvidenceSagas);
}

export default watchUpdateEvidence;
