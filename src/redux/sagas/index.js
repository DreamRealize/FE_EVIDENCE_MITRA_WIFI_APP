import { all } from "redux-saga/effects";
import authSaga from "./authSagas";
import watchLogout from "./logoutSaga";
import watchUserMe from "./meSaga";
import watchOrderSagas from "./orderSagas";
import watchStatusSagas from "./catStatusSagas";
import watchCategoryService from "./catServiceSagas";
import watchMitra from "./mitraSagas";
import watchCreateOrderSagas from "./createOrderSagas";
import watchGetOrderById from "./getOrderIdSagas";
import watchUpdateOrder from "./updateOrderSagas";
import watchEvidenSagas from "./evidenSagas";
import watchCatStatEvidenSagas from "./catStatEvidenSagas";
import watchCreateEvidenSagas from "./createEvidenSagas";
import watchRegister from "./registerSagas";

function* rootSaga() {
   yield all([
      authSaga(),
      watchLogout(),
      watchUserMe(),
      watchOrderSagas(),
      watchStatusSagas(),
      watchCategoryService(),
      watchMitra(),
      watchCreateOrderSagas(),
      watchGetOrderById(),
      watchUpdateOrder(),
      watchEvidenSagas(),
      watchCatStatEvidenSagas(),
      watchCreateEvidenSagas(),
      watchRegister(),
      // Add other sagas here
   ]);
}

export default rootSaga;
