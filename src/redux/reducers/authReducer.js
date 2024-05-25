import {
   LOGIN_REQUEST,
   LOGIN_SUCCESS,
   LOGIN_FAILED,
   LOGIN_SUCCESS_REDIRECT,
   LOGIN_FAILED_MESSAGE,
   LOGOUT_REQUEST,
   LOGOUT_SUCCESS,
   LOGOUT_FAILED,
   LOGOUT_SUCCESS_REDIRECT,
   REGISTER_REQUEST,
   REGISTER_SUCCESS,
   REGISTER_FAILED,
   RESET_REGISTER_SUCCESS_REDIRECT,
   REGISTER_SUCCESS_REDIRECT,
} from "../constants/actionTypes";

const initialState = {
   loading: false,
   loadingupdateuser: false,
   loadingcreatemitra: false,
   loadingimage: false,
   token: null,
   error: null,
   registerSuccessRedirect: false,
   loginSuccessRedirect: false,
   isAuthenticated: false,
   redirect: false,
   logoutSuccessRedirect: false,
   loginError: null,
   validationErrors: {},
   messageErrorToast: {},
   messageSuccessToast: {},
};

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case LOGIN_REQUEST:
         return { ...state, loading: true, error: null };

      case LOGIN_SUCCESS:
         return {
            ...state,
            loading: false,
            isAuthenticated: true,
            token: action.payload.token,
            error: null,
            messageErrorToast: {},
            messageSuccessToast: action.payload.message,
            loginError: null,
            validationErrors: {},
            logoutSuccessRedirect: false,
         };

      case LOGIN_SUCCESS_REDIRECT:
         return { ...state, redirect: true }; // Set status untuk redirect

      case LOGIN_FAILED:
         return {
            ...state,
            loading: false,
            isAuthenticated: false,
            token: null,
            loginError: action.payload,
            validationErrors: action.payload,
         };

      case LOGIN_FAILED_MESSAGE:
         return {
            ...state,
            loading: false,
            isAuthenticated: false,
            token: null,
            messageErrorToast: action.payload,
         };
      case LOGOUT_REQUEST:
         return {
            ...state,
            loading: true,
            error: null,
            redirect: false,
         };

      case LOGOUT_SUCCESS:
         return {
            ...state,
            loading: false,
            isAuthenticated: false,
            redirect: false,
            registerSuccessRedirect: false,
            token: null,
            error: null,
            messageSuccessToast: action.payload.message,
         };

      case LOGOUT_SUCCESS_REDIRECT:
         return { ...state, logoutSuccessRedirect: true };

      case LOGOUT_FAILED:
         return {
            ...state,
            loading: false,
            messageErrorToast: action.payload,
         };

      case REGISTER_REQUEST:
         return { ...state, loadingcreatemitra: true, error: null };

      case REGISTER_SUCCESS:
         return {
            ...state,
            loadingcreatemitra: false,
            isAuthenticated: false,
            registerSuccessRedirect: false,
            redirect: false,
            token: null,
            error: null,
         };

      case REGISTER_SUCCESS_REDIRECT:
         return { ...state, registerSuccessRedirect: true };

      case RESET_REGISTER_SUCCESS_REDIRECT:
         return { ...state, registerSuccessRedirect: false };

      case REGISTER_FAILED:
         return {
            ...state,
            loadingcreatemitra: false,
            error: action.payload,
         };

      default:
         return state;
   }
};

export default authReducer;
