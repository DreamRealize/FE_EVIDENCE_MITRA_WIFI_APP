import {
   EVIDEN_REQUEST,
   EVIDEN_SUCCESS,
   EVIDEN_FAILED,
   CREATE_EVIDEN_REQUEST,
   CREATE_EVIDEN_SUCCESS,
   CREATE_EVIDEN_FAILURE,
   DELETE_EVIDENCE_REQUEST,
   DELETE_EVIDENCE_SUCCESS,
   DELETE_EVIDENCE_FAILED,
   GET_EVIDENCE_BY_ID_REQUEST,
   GET_EVIDENCE_BY_ID_SUCCESS,
   GET_EVIDENCE_BY_ID_FAILURE,
   UPDATE_EVIDENCE_REQUEST,
   UPDATE_EVIDENCE_SUCCESS,
   UPDATE_EVIDENCE_FAILURE,
} from "../constants/actionTypes";

const initialState = {
   loading: false,
   loadingDelete: false,
   data: [],
   deletedEviden: null,
   error: null,
   newEviden: null,
   eviden: null,
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

      case DELETE_EVIDENCE_REQUEST:
         return {
            ...state,
            loadingDelete: true,
            error: null,
         };

      case DELETE_EVIDENCE_SUCCESS:
         return {
            ...state,
            loadingDelete: false,
            deletedEviden: action.payload.deletedEviden,
            error: null,
         };

      case DELETE_EVIDENCE_FAILED:
         return {
            ...state,
            loadingDelete: false,
            deletedEviden: null,
            error: action.payload.error,
         };

      case GET_EVIDENCE_BY_ID_REQUEST:
         return {
            ...state,
            loading: true,
            error: null,
         };
      case GET_EVIDENCE_BY_ID_SUCCESS:
         return {
            ...state,
            loading: false,
            eviden: action.payload,
         };
      case GET_EVIDENCE_BY_ID_FAILURE:
         return {
            ...state,
            loading: false,
            error: action.payload,
         };

      case UPDATE_EVIDENCE_REQUEST:
         return { ...state, loading: true, error: null };
      case UPDATE_EVIDENCE_SUCCESS:
         return { ...state, loading: false, newEviden: action.payload };
      case UPDATE_EVIDENCE_FAILURE:
         return { ...state, loading: false, newEviden: action.payload };

      default:
         return state;
   }
};

export default evidenReducer;
