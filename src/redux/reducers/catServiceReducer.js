import {
        FETCH_CATEGORY_SERVICE_REQUEST,
        FETCH_CATEGORY_SERVICE_SUCCESS,
        FETCH_CATEGORY_SERVICE_FAILED,
     } from "../constants/actionTypes";
     
     const initialState = {
        loading: false,
        categories: [],
        error: null,
        token: null,
     };
     
     const catServiceReducer = (state = initialState, action) => {
        switch (action.type) {
           case FETCH_CATEGORY_SERVICE_REQUEST:
              return { ...state, loading: true, error: null };
     
           case FETCH_CATEGORY_SERVICE_SUCCESS:
              return {
                 ...state,
                 loading: false,
                 categories: action.payload,
                 error: null,
              };
     
           case FETCH_CATEGORY_SERVICE_FAILED:
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
     
     export default catServiceReducer;
     