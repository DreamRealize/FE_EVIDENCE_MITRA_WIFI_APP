// meActions.js
import {
   USER_ME_REQUEST,
   USER_ME_SUCCESS,
   USER_ME_FAILED,
} from "../constants/actionTypes";

const initialState = {
   loading: false,
   user: null,
   error: null,
   token: null,
};

const meReducer = (state = initialState, action) => {
   switch (action.type) {
      case USER_ME_REQUEST:
         return { ...state, loading: true, error: null };

      case USER_ME_SUCCESS:
         return {
            ...state,
            loading: false,
            user: action.payload,
            error: null,
            token: action.payload.token,
         };

      case USER_ME_FAILED:
         return {
            ...state,
            loading: false,
            user: null,
            error: action.payload,
         };

      default:
         return state;
   }
};

export default meReducer;
