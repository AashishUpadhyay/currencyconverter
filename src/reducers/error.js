import { ActionTypes as actionTypes } from '../constants';

var defaultState = { errorMsg: '' }

function error(state = defaultState, action) {
    switch (action.type) {
        case (actionTypes.RECEIVED_AJAX_CALL_FAILURE):
            return { ...state, errorMsg: action.data.msg }
        case (actionTypes.RECEIVED_MAKE_FEE_SUCCESS):
            return { ...state, errorMsg: '' }
        default: return state;
    }
}

export default error;