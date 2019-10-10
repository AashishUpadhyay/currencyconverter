import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import createSagaMiddleware from 'redux-saga';
import { initSagas } from '../initSagas';

const logger = createLogger({
    collapsed: true
});
const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger, sagaMiddleWare)
);
console.info("Saga middleware implemented!")
initSagas(sagaMiddleWare);
export default store;