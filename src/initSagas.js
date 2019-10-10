import * as sagas from './sagas';

export const initSagas = (sagaMiddleware) => {
    Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
}

export function* fetchConversionRateSaga(payload = {
    originAmount: 100,
    originCurrency: 'USD',
    destCurrency: 'EUR',
    calcOriginAmount: false
}) {
    const response = yield call(axios.get('/api/conversion', {
        params: payload
    }));

    const data = yield apply(response, response.json);
    console.info(data);;
}