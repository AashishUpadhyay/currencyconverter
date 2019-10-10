import axios from 'axios';
import debounce from 'lodash.debounce';
import { ActionTypes as actionTypes } from '../constants';

export function changeOriginAmount(newAmount) {
    return {
        type: actionTypes.CHANGE_ORIGIN_AMOUNT,
        data: newAmount
    }
}

export function changeDestinationAmount(newAmount) {
    return {
        type: actionTypes.CHANGE_DESTINATION_AMOUNT,
        data: newAmount
    }
}

export function changeOriginCurrency(newCurrency) {
    return {
        type: actionTypes.CHANGE_ORIGIN_CURRENCY,
        data: newCurrency
    }
}

export function changeDestinationCurrency(newCurrency) {
    return {
        type: actionTypes.CHANGE_DESTINATION_CURRENCY,
        data: newCurrency
    }
}

export function fetchConversionRate(payload) {
    return (dispatch) => {
        makeConversionAjaxCall(payload, dispatch);
    }
}

export function fetchConversionRateAndFees(payload) {
    return (dispatch) => {
        makeConversionAndFeesAjaxCall(payload, dispatch);
    }
}

export function fetchMakeFee(payload) {
    return (dispatch) => {
        makeMakeFeeAjaxCall(payload, dispatch);
    }
}

var makeConversionAjaxCall = debounce(_makeConversionAjaxCall, 300);
var makeConversionAndFeesAjaxCall = debounce(_makeConversionAndFeesAjaxCall, 300);
var makeMakeFeeAjaxCall = debounce(_makeMakeFeeAjaxCall, 300);

export function _makeConversionAjaxCall(payload, dispatch) {
    console.log('I AM CALLED!');
    dispatch({ type: actionTypes.REQUEST_CONVERSION_RATE, data: payload });

    axios.get('/api/conversion', {
        params: payload
    })
        .then((resp) => {
            dispatch({ type: actionTypes.RECEIVED_CONVERSION_RATE_SUCCESS, data: resp.data });
        })
        .catch((err) => {
            dispatch({ type: actionTypes.RECEIVED_CONVERSION_RATE_FAILURE, data: err.data });
        });
}

function _makeConversionAndFeesAjaxCall(payload, dispatch) {
    dispatch({ type: actionTypes.REQUEST_CONVERSION_RATE, data: payload });

    axios.get('/api/conversion', {
        params: payload
    })
        .then((resp) => {
            dispatch({ type: actionTypes.RECEIVED_CONVERSION_RATE_SUCCESS, data: resp.data });
            var feePayload = { ...payload, originAmount: resp.data.originAmount };
            dispatch(fetchMakeFee(feePayload));
        })
        .catch((err) => {
            dispatch({ type: actionTypes.RECEIVED_CONVERSION_RATE_FAILURE, data: err.data });
        });
}

function _makeMakeFeeAjaxCall(payload, dispatch) {
    dispatch({ type: actionTypes.REQUEST_MAKE_FEE, data: payload });

    axios.get('/api/fees', {
        params: payload
    })
        .then((resp) => {
            dispatch({ type: actionTypes.RECEIVED_MAKE_FEE_SUCCESS, data: resp.data });
        })
        .catch((resp) => {
            var msg = getErrorMessage(resp);
            dispatch({ type: actionTypes.RECEIVED_AJAX_CALL_FAILURE, data: { msg: msg, failedCall: 'fees' } });
        });
}

function getErrorMessage(resp) {
    var msg = 'Error. Please try again later.'

    if (resp && resp.request && resp.request.status === 0) {
        msg = 'Oh no! App appears to be offline.'
    }

    return msg;
}
