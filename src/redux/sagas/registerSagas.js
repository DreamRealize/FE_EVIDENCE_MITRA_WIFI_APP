import { takeEvery, put, call, delay } from "redux-saga/effects";
import { REGISTER_REQUEST } from "../constants/actionTypes";
import { registerApi } from "../../services/authServices/registerApi";
import {
   registerSuccess,
   registerFailed,
   registerSuccessRedirect,
} from "../actions/authActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Simulasi delay untuk 4 detik
const delayTime = 3000;

function* registerSaga(action) {
   try {
      const { usernameId, nama, idUserRoles, password } = action.payload;
      yield delay(delayTime); // Menunggu 4 detik
      const response = yield call(
         registerApi,
         usernameId,
         nama,
         idUserRoles,
         password
      );
      yield put(registerSuccess(response.message));
      yield put(registerSuccessRedirect());

      const successMessage = response.message || "Logout successful haha";
      toast.success(successMessage);
   } catch (error) {
      if (error.response && error.response.data) {
         yield put(registerFailed(error.response.data.error));
      } else {
         yield put(registerFailed("An error occurred during registration."));
      }
   }
}

function* watchRegister() {
   yield takeEvery(REGISTER_REQUEST, registerSaga);
}

export default watchRegister;
