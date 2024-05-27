import * as actionTypes from "../constants/actionTypes";

export const loginRequest = (usernameId, password) => ({
   type: actionTypes.LOGIN_REQUEST,
   payload: { usernameId, password },
});

export const loginSuccess = (token) => ({
   type: actionTypes.LOGIN_SUCCESS,
   payload: token,
});

export const loginSuccessRedirect = () => ({
   type: actionTypes.LOGIN_SUCCESS_REDIRECT,
});

export const loginFailed = (errors) => ({
   type: actionTypes.LOGIN_FAILED,
   payload: errors,
});

export const messageError = (errors) => ({
   type: actionTypes.LOGIN_FAILED_MESSAGE,
   payload: errors,
});

// logout
export const logOutRequest = () => ({
   type: actionTypes.LOGOUT_REQUEST,
});
export const logOutSuccess = (response) => ({
   type: actionTypes.LOGOUT_SUCCESS,
   payload: response,
});
export const logoutSuccessRedirect = () => ({
   type: actionTypes.LOGOUT_SUCCESS_REDIRECT,
});
export const resetRegisterSuccessRedirect = () => ({
   type: actionTypes.RESET_REGISTER_SUCCESS_REDIRECT,
});

export const logOutFailed = (error) => ({
   type: actionTypes.LOGOUT_FAILED,
   payload: error,
});

// me
export const userMeRequest = () => ({
   type: actionTypes.USER_ME_REQUEST,
});

export const userMeSuccess = (data) => ({
   type: actionTypes.USER_ME_SUCCESS,
   payload: data,
});

export const userMeFailed = (error) => ({
   type: actionTypes.USER_ME_FAILED,
   payload: error,
});

// order
export const orderRequest = (page) => ({
   type: actionTypes.ORDER_REQUEST,
   payload: { page },
});

export const orderSuccess = (data) => ({
   type: actionTypes.ORDER_SUCCESS,
   payload: data,
});

export const orderFailed = (error) => ({
   type: actionTypes.ORDER_FAILED,
   payload: error,
});

// Action category Service
export const fetchCategoryServiceRequest = () => ({
   type: actionTypes.FETCH_CATEGORY_SERVICE_REQUEST,
});

export const fetchCategoryServiceSuccess = (categories) => ({
   type: actionTypes.FETCH_CATEGORY_SERVICE_SUCCESS,
   payload: categories,
});

export const fetchCategoryServiceFailed = (error) => ({
   type: actionTypes.FETCH_CATEGORY_SERVICE_FAILED,
   payload: error,
});

// Action category Service
export const fetchCategoryStatusRequest = () => ({
   type: actionTypes.FETCH_CATEGORY_STATUS_REQUEST,
});

export const fetchCategoryStatusSuccess = (categories) => ({
   type: actionTypes.FETCH_CATEGORY_STATUS_SUCCESS,
   payload: categories,
});

export const fetchCategoryStatusFailed = (error) => ({
   type: actionTypes.FETCH_CATEGORY_STATUS_FAILED,
   payload: error,
});

export const fetchMitraRequest = (page) => ({
   type: actionTypes.FETCH_MITRA_REQUEST,
   payload: { page },
});

export const fetchMitraSuccess = (data) => ({
   type: actionTypes.FETCH_MITRA_SUCCESS,
   payload: data,
});

export const fetchMitraFailed = (error) => ({
   type: actionTypes.FETCH_MITRA_FAILED,
   payload: error,
});

// create order
export const createOrderRequest = (formData) => ({
   type: actionTypes.CREATE_ORDER_REQUEST,
   payload: { formData },
});

export const createOrderSuccess = (newOrder) => ({
   type: actionTypes.CREATE_ORDER_SUCCESS,
   payload: { newOrder },
});

export const createOrderFailure = (error) => ({
   type: actionTypes.CREATE_ORDER_FAILURE,
   payload: { error },
});

// id
export const getOrderByIdRequest = (orderId) => ({
   type: actionTypes.GET_ORDER_BY_ID_REQUEST,
   payload: orderId,
});

export const getOrderByIdSuccess = (order) => ({
   type: actionTypes.GET_ORDER_BY_ID_SUCCESS,
   payload: order,
});

export const getOrderByIdFailure = (error) => ({
   type: actionTypes.GET_ORDER_BY_ID_FAILURE,
   payload: error,
});

export const updateOrderRequest = (idOrder, orderData) => ({
   type: actionTypes.UPDATE_ORDER_REQUEST,
   payload: { idOrder, orderData },
});

export const updateOrderSuccess = (order) => ({
   type: actionTypes.UPDATE_ORDER_SUCCESS,
   payload: order,
});

export const updateOrderFailure = (error) => ({
   type: actionTypes.UPDATE_ORDER_FAILURE,
   payload: error,
});

// order
export const evidenRequest = (page) => ({
   type: actionTypes.EVIDEN_REQUEST,
   payload: { page },
});

export const evidenSuccess = (data) => ({
   type: actionTypes.EVIDEN_SUCCESS,
   payload: data,
});

export const evidenFailed = (error) => ({
   type: actionTypes.EVIDEN_FAILED,
   payload: error,
});

// Action category Service
export const fetchStatusEvidenRequest = () => ({
   type: actionTypes.FETCH_STATUS_EVIDEN_REQUEST,
});

export const fetchStatusEvidenSuccess = (categories) => ({
   type: actionTypes.FETCH_STATUS_EVIDEN_SUCCESS,
   payload: categories,
});

export const fetchStatusEvidenFailed = (error) => ({
   type: actionTypes.FETCH_STATUS_EVIDEN_FAILED,
   payload: error,
});

// create order
export const createEvidenRequest = (formData) => ({
   type: actionTypes.CREATE_EVIDEN_REQUEST,
   payload: { formData },
});

export const createEvidenSuccess = (newOrder) => ({
   type: actionTypes.CREATE_EVIDEN_SUCCESS,
   payload: { newOrder },
});

export const createEvidenFailure = (error) => ({
   type: actionTypes.CREATE_EVIDEN_FAILURE,
   payload: { error },
});

export const registerRequest = (usernameId, nama, idUserRoles, password) => ({
   type: actionTypes.REGISTER_REQUEST,
   payload: { usernameId, nama, idUserRoles, password },
});

export const registerSuccess = (message) => ({
   type: actionTypes.REGISTER_SUCCESS,
   payload: message,
});

export const registerSuccessRedirect = () => ({
   type: actionTypes.REGISTER_SUCCESS_REDIRECT,
});

export const registerFailed = (errors) => ({
   type: actionTypes.REGISTER_FAILED,
   payload: errors,
});

export const deleteOrderRequest = (idOrder) => ({
   type: actionTypes.DELETE_ORDER_REQUEST,
   payload: { idOrder },
});

export const deleteOrderSuccess = (deletedOrder) => ({
   type: actionTypes.DELETE_ORDER_SUCCESS,
   payload: { deletedOrder },
});

export const deleteOrderFailed = (error) => ({
   type: actionTypes.DELETE_ORDER_FAILED,
   payload: { error },
});

export const deleteEvidenceRequest = (idEviden) => ({
   type: actionTypes.DELETE_EVIDENCE_REQUEST,
   payload: { idEviden },
});

export const deleteEvidenceSuccess = (deletedEviden) => ({
   type: actionTypes.DELETE_EVIDENCE_SUCCESS,
   payload: { deletedEviden },
});

export const deleteEvidenceFailed = (error) => ({
   type: actionTypes.DELETE_EVIDENCE_FAILED,
   payload: { error },
});

export const getEvidenceByIdRequest = (idEviden) => ({
   type: actionTypes.GET_EVIDENCE_BY_ID_REQUEST,
   payload: idEviden,
});

export const getEvidenceByIdSuccess = (eviden) => ({
   type: actionTypes.GET_EVIDENCE_BY_ID_SUCCESS,
   payload: eviden,
});

export const getEvidenceByIdFailure = (error) => ({
   type: actionTypes.GET_EVIDENCE_BY_ID_FAILURE,
   payload: error,
});

export const updateEvidenceRequest = (idEviden, evidenData) => ({
   type: actionTypes.UPDATE_EVIDENCE_REQUEST,
   payload: { idEviden, evidenData },
});

export const updateEvidenceSuccess = (eviden) => ({
   type: actionTypes.UPDATE_EVIDENCE_SUCCESS,
   payload: eviden,
});

export const updateEvidenceFailure = (error) => ({
   type: actionTypes.UPDATE_EVIDENCE_FAILURE,
   payload: error,
});
