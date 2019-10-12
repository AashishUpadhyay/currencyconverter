import { select, put, take, debounce } from 'redux-saga/effects';
import "babel-polyfill";
import axios from 'axios';
import { ActionTypes as actionTypes } from '../constants';
import { fetchConversionRate, fetchMakeFee } from '../actions/actions';
import { feesPayloadSelector } from '../selectors';

function* _requestConversionRateAndFees({ data }) {
    yield put(fetchConversionRate(data));
    yield take(actionTypes.RECEIVED_CONVERSION_RATE_SUCCESS);
    var feesPayload = yield select(feesPayloadSelector);
    console.log('FP', feesPayload);
    yield put(fetchMakeFee(feesPayload));
}

export function* debounceFetchConversionRateAndFees() {
    yield debounce(300, actionTypes.REQUEST_CONVERSION_RATE_AND_FEES, _requestConversionRateAndFees);
    console.log("FetchConversionRateAndFees Successful!")
}