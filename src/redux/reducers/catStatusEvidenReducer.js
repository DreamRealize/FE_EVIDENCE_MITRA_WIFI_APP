import {
	FETCH_STATUS_EVIDEN_REQUEST,
	FETCH_STATUS_EVIDEN_SUCCESS,
	FETCH_STATUS_EVIDEN_FAILED,
} from "../constants/actionTypes";

const initialState = {
	loading: false,
	categories: [],
	error: null,
	token: null,
};

const catStatusEvidenReducer = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case FETCH_STATUS_EVIDEN_REQUEST:
			return { ...state, loading: true, error: null };

		case FETCH_STATUS_EVIDEN_SUCCESS:
			return {
				...state,
				loading: false,
				categories: action.payload,
				error: null,
			};

		case FETCH_STATUS_EVIDEN_FAILED:
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

export default catStatusEvidenReducer;
