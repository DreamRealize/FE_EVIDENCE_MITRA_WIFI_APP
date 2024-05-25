import {
   FETCH_CATEGORY_STATUS_REQUEST,
   FETCH_CATEGORY_STATUS_SUCCESS,
   FETCH_CATEGORY_STATUS_FAILED,
} from "../constants/actionTypes";

const initialState = {
   loading: false,
   categories: [],
   error: null,
   token: null,
};

const catStatusReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_CATEGORY_STATUS_REQUEST:
         return { ...state, loading: true, error: null };

      case FETCH_CATEGORY_STATUS_SUCCESS:
         return {
            ...state,
            loading: false,
            categories: action.payload,
            error: null,
         };

      case FETCH_CATEGORY_STATUS_FAILED:
         return {
            ...state,
            loading: false,
            categories: [],
            error: action.payload,
         };

      default:
         return state;
   }
};

export default catStatusReducer;
