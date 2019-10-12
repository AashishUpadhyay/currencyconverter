import { call, put, debounce } from 'redux-saga/effects';
import "babel-polyfill";
import axios from 'axios';
import { ActionTypes as actionTypes } from '../constants';
import { receivedMakeFeesSuccess, receivedAJAXCallFailure } from '../actions/actions';

function* _makeMakeFeeAjaxCall({ data }) {
    const response = yield call(makeFeesApi, data);
    if (response.status !== 200) {
        yield put(receivedAJAXCallFailure(response));
    }
    yield put(receivedMakeFeesSuccess(response.data));
}

function makeFeesApi(payload) {
    return axios.get('/api/fees', {
        params: payload
    });
}

export function* debounceFetchMakeFee() {
    yield debounce(300, actionTypes.REQUEST_MAKE_FEE, _makeMakeFeeAjaxCall)
}