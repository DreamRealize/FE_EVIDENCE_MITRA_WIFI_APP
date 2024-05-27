import { takeLatest, put, call } from "redux-saga/effects";
import { GET_EVIDENCE_BY_ID_REQUEST } from "../constants/actionTypes";
import { evidenceGetById } from "../../services/dataUser/evidenceGetById";
import {
   getEvidenceByIdSuccess,
   getEvidenceByIdFailure,
} from "../actions/authActions";

function* getEvidenceIdSagas(action) {
   try {
      const response = yield call(evidenceGetById, action.payload);
      yield put(getEvidenceByIdSuccess(response.data));
   } catch (error) {
      yield put(getEvidenceByIdFailure(error.message));
   }
}

function* watchGetEvidenceById() {
   yield takeLatest(GET_EVIDENCE_BY_ID_REQUEST, getEvidenceIdSagas);
}

export default watchGetEvidenceById;
