import { takeEvery, put, call, select, delay } from "redux-saga/effects";
import { LOGOUT_REQUEST } from "../constants/actionTypes";
import { logoutApi } from "../../services/authServices/logoutApi";
import { push } from "react-router-redux";
import {
   logOutSuccess,
   logOutFailed,
   logoutSuccessRedirect,
} from "../actions/authActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const delayTime = 3000;

function* logoutSaga(action) {
   try {
      // Mengambil token dari state Redux (contoh jika token disimpan di state)
      const token = yield select((state) => state.auth.token);
      yield delay(delayTime); // Menunggu 4 detik
      // Memanggil API logout dengan menyertakan token
      const response = yield call(logoutApi, token);

      // Menyimpan aksi logout berhasil di Redux
      yield put(logOutSuccess(response));

      // Menghapus token dari localStorage atau Redux state setelah berhasil logout
      localStorage.removeItem("token");

      yield put(logoutSuccessRedirect());

      yield put(push("/login")); // Redirect to /login after successful logout

      const successMessage = response.message || "Login successful haha";
      toast.success(successMessage);
   } catch (error) {
      yield put(logOutFailed(error));
   }
}

function* watchLogout() {
   yield takeEvery(LOGOUT_REQUEST, logoutSaga);
}

export default watchLogout;
