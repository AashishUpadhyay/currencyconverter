import { createStore } from 'redux';

var defaultState = {
    originAmount: '0.00'
};
function amount(state = defaultState, action) {
    if (action.type === 'CHANGE_ORIGIN_AMOUNT') {
        return { ...state, originAmount: action.data };
    }
    return state;
}

var store = createStore(amount);

// store.subscribe(function () {
//     console.log('state', store.getState());
// });

// store.dispatch({ type: 'CHANGE_ORGIN_AMOUNT', data: '300.65' });
// store.dispatch({ type: '' });
// store.dispatch({ type: '' });

export default store;