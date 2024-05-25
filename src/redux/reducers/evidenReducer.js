import {
   EVIDEN_REQUEST,
   EVIDEN_SUCCESS,
   EVIDEN_FAILED,
   CREATE_EVIDEN_REQUEST,
   CREATE_EVIDEN_SUCCESS,
   CREATE_EVIDEN_FAILURE,
} from "../constants/actionTypes";

const initialState = {
   loading: false,
   loadingDelete: false,
   data: [],
   deletedPemasukan: null,
   error: null,
   newEviden: null,
   order: null,
};

const evidenReducer = (state = initialState, action) => {
   switch (action.type) {
      case EVIDEN_REQUEST:
         return { ...state, loading: true, error: null };

      case EVIDEN_SUCCESS:
         return { ...state, loading: false, data: action.payload, error: null };

      case EVIDEN_FAILED:
         return { ...state, loading: false, data: [], error: action.payload };

      case CREATE_EVIDEN_REQUEST:
         return {
            ...state,
            loading: true,
            error: null,
            newEviden: null,
         };

      case CREATE_EVIDEN_SUCCESS:
         return {
            ...state,
            loading: false,
            newEviden: action.payload.newEviden,
            error: null,
         };

      case CREATE_EVIDEN_FAILURE:
         return {
            ...state,
            loading: false,
            error: action.payload.error,
         };

      default:
         return state;
   }
};

export default evidenReducer;
