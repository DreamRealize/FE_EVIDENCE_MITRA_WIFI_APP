import {
   FETCH_MITRA_REQUEST,
   FETCH_MITRA_SUCCESS,
   FETCH_MITRA_FAILED,
} from "../constants/actionTypes";

const initialState = {
   loading: false,
   mitra: [],
   error: null,
   token: null,
};

const mitraReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_MITRA_REQUEST:
         return { ...state, loading: true, error: null };

      case FETCH_MITRA_SUCCESS:
         return {
            ...state,
            loading: false,
            mitra: action.payload,
            error: null,
         };

      case FETCH_MITRA_FAILED:
         return {
            ...state,
            loading: false,
            mitra: [],
            error: action.payload,
         };

      default:
         return state;
   }
};

export default mitraReducer;
