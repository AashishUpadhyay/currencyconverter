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
    return {
        type: actionTypes.REQUEST_CONVERSION_RATE,
        data: payload
    }
}

export function fetchMakeFee(payload) {
    return {
        type: actionTypes.REQUEST_MAKE_FEE,
        data: payload
    }
}

export function receivedConversionRateSuccess(data) {
    return {
        type: actionTypes.RECEIVED_CONVERSION_RATE_SUCCESS,
        data: data
    }
}

export function receivedConversionRateFailure(data) {
    return {
        type: actionTypes.RECEIVED_CONVERSION_RATE_FAILURE,
        data: data
    }
}

export function receivedMakeFeesSuccess(data) {
    return {
        type: actionTypes.RECEIVED_MAKE_FEE_SUCCESS,
        data: data
    }
}

export function receivedAJAXCallFailure(resp) {
    var msg = getErrorMessage(resp);
    return {
        type: actionTypes.RECEIVED_AJAX_CALL_FAILURE,
        data: { msg: msg, failedCall: 'fees' }
    }
}

export function fetchConversionRateAndFees(payload) {
    return {
        type: actionTypes.REQUEST_CONVERSION_RATE_AND_FEES,
        data: payload
    }
}

function getErrorMessage(resp) {
    var msg = 'Error. Please try again later.'

    if (resp && resp.request && resp.request.status === 0) {
        msg = 'Oh no! App appears to be offline.'
    }

    return msg;
}
