import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import combinedReducers from "./reducers";
import allSagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combinedReducers,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(allSagas);

export default store;