import { call, put, debounce } from 'redux-saga/effects';
import "babel-polyfill";
import axios from 'axios';
import { ActionTypes as actionTypes } from '../constants';
import { receivedConversionRateSuccess, receivedConversionRateFailure } from '../actions/actions';

function* _makeConversionAjaxCall({ data }) {
    const response = yield call(conversionApi, data);
    if (response.status !== 200) {
        yield put(receivedConversionRateFailure(response.data));
    }
    yield put(receivedConversionRateSuccess(response.data));
}

function conversionApi(payload) {
    return axios.get('/api/conversion', {
        params: payload
    });
}

export function* debounceFetchConversionRate() {
    yield debounce(300, actionTypes.REQUEST_CONVERSION_RATE, _makeConversionAjaxCall)
}