import { useLocalStore } from "mobx-react";
import { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    setWallet as SetWallet,
    setConnected as SetConnected,
    setLoadingTrx as SetLoadingTrx,
    setLoading as SetLoading,
    fetchWalletBalance as FetchWalletBalance,
    appendTrx
} from "../stores/actions";

const createTokenTransactionsStore = () => ({

    transactions: [],
    loadingTrx: false,
    loadingAddress: false,
    connected: true,
    wallet: {
        balance:0,
        address: null
    },
    setWallet(wallet){
        this.wallet = {...this.wallet,...wallet};
    },
    getConnected(){
        return this.connected;
    },
    setConnected(state){
        this.connected = state;
    },
    getLoadingTrx(){
        return this.loadingTrx;
    },
    setLoadingTrx(status){
        this.loadingTrx = status;
    },
    getWallet(){
        return this.wallet;
    },
    addTrxn(trx){
        this.transactions = [trx,...this.transactions]
    },
    deleteTrx(id){
        return this.transactions.filter((trx,index)=>index!==id?trx:null);
    }
    
});

const TransactionStoreContext = createContext(null);

const TransactionStoreProvider = ({children}) => {
    const store = useLocalStore(createTokenTransactionsStore);
    return (<TransactionStoreContext.Provider value={store}>
        {children}
    </TransactionStoreContext.Provider>);
}

// export const useTransactionsStore = () => useContext(TransactionStoreContext);

export const useTransactionsStore = () => {

    const dispatch = useDispatch();

    const state = useSelector(state=>state.transactions);

    const setWallet = (wallet) => {
        dispatch(SetWallet(wallet));
    }

    const getConnected = () => {
        return state.connected
    }

    const setConnected = (state) => {
        dispatch(SetConnected(state));
    }

    const getLoadingTrx = () => {
        return state.loadingTrx;
    }

    const setLoadingTrx = (status) => {
        dispatch(SetLoadingTrx(status))
    }

    const getWallet = () => {
        return state.wallet;
    }

    const setLoading = (state) => {
        dispatch(SetLoading(state));
    }

    const getLoading = () => {
        return state.loading;
    }

    const fetchWalletBalance = (address) => {
        dispatch(FetchWalletBalance(address));
    }

    const addTrx = (trx) => {
        dispatch(appendTrx(trx));
    }

    return {
        setConnected,
        setWallet,
        setLoadingTrx,
        setLoading,
        getLoading,
        getLoadingTrx,
        getConnected,
        getWallet,
        fetchWalletBalance,
        addTrx,
        trx: state.transactions
    }
}


export default TransactionStoreProvider;