import { takeEvery, put, call, delay } from "redux-saga/effects";
import { LOGIN_REQUEST } from "../constants/actionTypes";
import { loginApi } from "../../services/authServices/loginApi";
import {
   loginSuccess,
   loginFailed,
   loginSuccessRedirect,
   messageError,
} from "../actions/authActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Simulasi delay untuk 4 detik
const delayTime = 3000;

function* loginSaga(action) {
   try {
      const { usernameId, password } = action.payload;
      yield delay(delayTime); // Menunggu 4 detik
      const response = yield call(loginApi, usernameId, password);
      yield put(loginSuccess(response.token));
      // Simpan token di local storage
      localStorage.setItem("token", response.token);
      localStorage.setItem("selectedMenuKey", 1);
      // Redirect ke Dashboard
      yield put(loginSuccessRedirect());
      // history.push('/dashboard'); // Jika menggunakan React Router
      const successMessage = response.message || "Login successful haha";
      toast.success(successMessage);
   } catch (error) {
      if (error.response && error.response.status === 422) {
         // Tanggapi kesalahan validasi
         yield put(loginFailed(error.response.data.error));
         yield put(messageError(error.response.data));
      } else {
         // Tanggapi kesalahan lainnya
         console.error("Error:", error);
      }
   }
}

function* authSaga() {
   yield takeEvery(LOGIN_REQUEST, loginSaga);
}

export default authSaga;
