import { apply, call, delay, put } from 'redux-saga/effects';
import "babel-polyfill";
import axios from 'axios';

export function* currencyConversionSaga() {
    while (true) {
        yield delay(1000);
        console.info('User saga loop!');
    }
}

function conversionApi(payload) {
    return axios.get('/api/conversion', {
        params: payload
    });
}

export function* fetchConversionRateSaga() {
    let payload = {
        originAmount: 100,
        originCurrency: 'USD',
        destCurrency: 'EUR',
        calcOriginAmount: false
    };
    const response = yield call(conversionApi, payload);
    console.info(response.data);
}