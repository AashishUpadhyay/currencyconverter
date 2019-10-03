import { ActionTypes as actionTypes } from '../constants';

var defaultState = {
    originAmount: '0.00',
    destinationAmount: '0.00',
    conversionRate: 1.5,
    feeAmount: 0.00,
    totalCost: 0.00,
    originCurrency: 'USD',
    destinationCurrency: 'EUR'
};

function amount(state = defaultState, action) {
    switch (action.type) {
        case (actionTypes.CHANGE_ORIGIN_AMOUNT):
            return { ...state, originAmount: action.data };
        case (actionTypes.CHANGE_DESTINATION_AMOUNT):
            return { ...state, destinationAmount: action.data };
        case (actionTypes.RECEIVED_CONVERSION_RATE_SUCCESS):
            return { ...state, conversionRate: action.data.xRate, destinationAmount: action.data.destAmount, originAmount: action.data.originAmount };
        case (actionTypes.RECEIVED_MAKE_FEE_SUCCESS):
            var newTotal = parseFloat(action.data.originAmount, 10) + parseFloat(action.data.feeAmount, 10);
            return { ...state, feeAmount: action.data.feeAmount, totalCost: parseFloat(newTotal) };
        case (actionTypes.CHANGE_ORIGIN_CURRENCY):
            return { ...state, originCurrency: action.data };
        case (actionTypes.CHANGE_DESTINATION_CURRENCY):
            return { ...state, destinationCurrency: action.data };
        default:
            return state;
    }
}

export default amount;