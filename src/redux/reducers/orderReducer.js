import {
   ORDER_REQUEST,
   ORDER_SUCCESS,
   ORDER_FAILED,
   CREATE_ORDER_REQUEST,
   CREATE_ORDER_SUCCESS,
   CREATE_ORDER_FAILURE,
   GET_ORDER_BY_ID_REQUEST,
   GET_ORDER_BY_ID_SUCCESS,
   GET_ORDER_BY_ID_FAILURE,
   UPDATE_ORDER_REQUEST,
   UPDATE_ORDER_SUCCESS,
   UPDATE_ORDER_FAILURE,
   DELETE_ORDER_REQUEST,
   DELETE_ORDER_SUCCESS,
   DELETE_ORDER_FAILED,
} from "../constants/actionTypes";

const initialState = {
   loading: false,
   loadingDelete: false,
   data: [],
   deletedOrder: null,
   error: null,
   newOrder: null,
   order: null,
};

const orderReducer = (state = initialState, action) => {
   switch (action.type) {
      case ORDER_REQUEST:
         return { ...state, loading: true, error: null };

      case ORDER_SUCCESS:
         return { ...state, loading: false, data: action.payload, error: null };

      case ORDER_FAILED:
         return { ...state, loading: false, data: [], error: action.payload };

      case CREATE_ORDER_REQUEST:
         return {
            ...state,
            loading: true,
            error: null,
            newOrder: null,
         };

      case CREATE_ORDER_SUCCESS:
         return {
            ...state,
            loading: false,
            newOrder: action.payload.newOrder,
            error: null,
         };

      case CREATE_ORDER_FAILURE:
         return {
            ...state,
            loading: false,
            error: action.payload.error,
         };

      case GET_ORDER_BY_ID_REQUEST:
         return {
            ...state,
            loading: true,
            error: null,
         };
      case GET_ORDER_BY_ID_SUCCESS:
         return {
            ...state,
            loading: false,
            order: action.payload,
         };
      case GET_ORDER_BY_ID_FAILURE:
         return {
            ...state,
            loading: false,
            error: action.payload,
         };

      case UPDATE_ORDER_REQUEST:
         return { ...state, loading: true, error: null };
      case UPDATE_ORDER_SUCCESS:
         return { ...state, loading: false, newOrder: action.payload };
      case UPDATE_ORDER_FAILURE:
         return { ...state, loading: false, newOrder: action.payload };

      case DELETE_ORDER_REQUEST:
         return {
            ...state,
            loadingDelete: true,
            error: null,
         };

      case DELETE_ORDER_SUCCESS:
         return {
            ...state,
            loadingDelete: false,
            deletedOrder: action.payload.deletedOrder,
            error: null,
         };

      case DELETE_ORDER_FAILED:
         return {
            ...state,
            loadingDelete: false,
            deletedOrder: null,
            error: action.payload.error,
         };
      default:
         return state;
   }
};

export default orderReducer;
