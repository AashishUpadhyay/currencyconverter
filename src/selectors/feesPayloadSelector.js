import { createSelector } from 'reselect'
const stateAmountSelector = state => state.amount;
export const feesPayloadSelector = createSelector(
    [stateAmountSelector],
    (stateAmount) => {
        return {
            originAmount: stateAmount.originAmount,
            originCurrency: stateAmount.originCurrency,
            destCurrency: stateAmount.destinationCurrency,
            calcOriginAmount: false
        }
    }
)