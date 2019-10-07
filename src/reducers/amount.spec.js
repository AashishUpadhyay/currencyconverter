import amount from './amount';
import { ActionTypes as actionTypes } from '../constants';

describe('amount reducer test', () => {
    it('should test change of origin amount!', () => {
        var newState = amount({ data: 100, type: actionTypes.CHANGE_ORIGIN_AMOUNT });
        expect(newState.originAmount).toEqual(100);
    });
});