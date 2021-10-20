import { call, takeLatest, putResolve } from "redux-saga/effects";
import { getWalletBalance } from "../services/payments";
import { FETCH_WALLET_BALANCE, setWallet } from "./actions";

function* fetchWallet(action) {

        const {address} = action.payload;
    try{
        const balance = yield call(getWalletBalance, [address]);
        yield putResolve(setWallet({address, balance}))
    }catch(e){
        yield putResolve(setWallet({address, balance:"N/A"}))
    }
}

export default function* allSagas(){
    yield takeLatest(FETCH_WALLET_BALANCE, fetchWallet);
}