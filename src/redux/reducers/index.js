import { combineReducers } from "redux";
import authReducer from "./authReducer";
import meReducer from "./meReducer";
import orderReducer from "./orderReducer";
import catServiceReducer from "./catServiceReducer";
import catStatusReducer from "./catStatusReducer";
import mitraReducer from "./mitraReducer";
import evidenReducer from "./evidenReducer";
import catStatusEvidenReducer from "./catStatusEvidenReducer";

const rootReducer = combineReducers({
   auth: authReducer,
   me: meReducer,
   order: orderReducer,
   catService: catServiceReducer,
   catStatus: catStatusReducer,
   mitra: mitraReducer,
   eviden: evidenReducer,
   catEviden: catStatusEvidenReducer,
   // Add other reducers here
});

export default rootReducer;
