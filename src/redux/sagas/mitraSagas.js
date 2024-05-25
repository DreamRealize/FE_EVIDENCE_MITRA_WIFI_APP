// src/sagas/categoryBankSagas.js
import { takeEvery, put, call } from "redux-saga/effects";
import { FETCH_MITRA_REQUEST } from "../constants/actionTypes";
import { getMitra } from "../../services/dataUser/getMitra"; // Implement this service
import {
	fetchMitraSuccess,
	fetchMitraFailed,
} from "../actions/authActions";

function* mitraSagas(action) {
	try {
		const { page } = action.payload;
		const response = yield call(getMitra, page);
		yield put(fetchMitraSuccess(response.data));
	} catch (error) {
		yield put(fetchMitraFailed(error));
	}
}

function* watchMitra() {
	yield takeEvery(FETCH_MITRA_REQUEST, mitraSagas);
}

export default watchMitra;
