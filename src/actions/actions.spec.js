import * as allActions from './actions';
import "babel-polyfill";
import { exportAllDeclaration } from '@babel/types';
import { ActionTypes as actionTypes } from '../constants';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'

jest.setTimeout(30000);

var logger = createLogger({
    collapsed: true
});

const middlewares = [thunk, logger]
const mockStore = configureMockStore(middlewares)

describe("Tests actions!", () => {
    it("should return change origin frequency action", async () => {
        var returnValue = allActions.changeOriginCurrency('EUR');
        expect(returnValue).toEqual({ type: actionTypes.CHANGE_ORIGIN_CURRENCY, data: 'EUR' });
    });

    it('fetches conversion rate and raises REQUEST_CONVERSION_RATE and RECEIVED_CONVERSION_RATE_SUCCESS actions', async () => {
        var mock = new MockAdapter(axios);

        var payload = {
            originAmount: 100,
            originCurrency: 'USD',
            destCurrency: 'EUR',
            calcOriginAmount: false
        };
        var apiResponseData = { conversionRate: 1.2, destinationAmount: 120, originAmount: 100 };

        mock.onGet('/api/conversion').reply(200, apiResponseData);
        const store = mockStore({ todos: [] });

        const expectedActions = [
            { type: actionTypes.REQUEST_CONVERSION_RATE, data: { ...payload } },
            { type: actionTypes.RECEIVED_CONVERSION_RATE_SUCCESS, data: apiResponseData }
        ]

        store.dispatch(allActions.fetchConversionRate(payload));

        const foo = true;
        await new Promise((r) => setTimeout(r, 1000));

        expect(expectedActions).toEqual(store.getActions());
    });
});