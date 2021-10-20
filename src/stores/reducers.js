import { combineReducers } from "redux";
import { TRX_LOCAL_STORE_KEY } from "../constants/appData";
import { APPEND_TRX, SET_CONNECTED, SET_LOADING, SET_LOADING_TRX, SET_WALLET } from "./actions";

export const transactionsReducer = (state = {
    transactions: JSON.parse(localStorage.getItem(TRX_LOCAL_STORE_KEY)) ?? [],
    loadingTrx: false,
    loadingAddress: false,
    connected: true,
    wallet: {
        balance: 0,
        address: null
    },
}, action) => {
    switch (action.type) {
        case SET_LOADING_TRX:
            const { loadingTrx } = action.payload;
            return { ...state, loadingTrx };

        case SET_LOADING:
            const { loading } = action.payload;
            return { ...state, loading };

        case SET_CONNECTED:
            const { connected } = action.payload;
            return { ...state, connected };

        case SET_WALLET:
            const { wallet } = action.payload;
            return { ...state, wallet };

        case APPEND_TRX:
            const { trx } = action.payload;
            return { ...state, transactions: [trx, ...state.transactions] };

        default:
            return state;
    }
}

export default combineReducers({
    transactions: transactionsReducer
})