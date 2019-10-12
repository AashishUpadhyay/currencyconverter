import amount from './amount';
import { ActionTypes as actionTypes } from '../constants';

describe('amount reducer test', () => {
    it('should test change of origin amount!', () => {
        var newState = amount({
            originAmount: '0.00',
            destinationAmount: '0.00',
            conversionRate: 1.5,
            feeAmount: 0.00,
            totalCost: 0.00,
            originCurrency: 'USD',
            destinationCurrency: 'EUR'
        }, { type: actionTypes.CHANGE_ORIGIN_AMOUNT, data: 100 });
        expect(newState.originAmount).toEqual(100);
    });
});