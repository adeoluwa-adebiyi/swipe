export const SET_LOADING_TRX = "SET_LOADING_TRX";
export const SET_LOADING = "SET_LOADING";
export const SET_CONNECTED = "SET_CONNECTED";
export const SET_WALLET = "SET_WALLET";
export const FETCH_WALLET_BALANCE = "FETCH_WALLET_BALANCE";
export const APPEND_TRX = "APPEND_TRX";

export const setLoadingTrx = (loadingTrx) =>{
    return {
        type: SET_LOADING_TRX,
        payload:{
            loadingTrx
        }
    }
}

export const setLoading = (loading) => {
    return {
        type: SET_LOADING,
        payload:{
            loading
        }
    }
}

export const setConnected = (connected) => {
    return {
        type: SET_CONNECTED,
        payload:{
            connected
        }
    }
}

export const setWallet = (wallet) => {
    return {
        type: SET_WALLET,
        payload:{
            wallet
        }
    }
}

export const fetchWalletBalance = (address) => {
    return {
        type: FETCH_WALLET_BALANCE,
        payload:{
            address
        }
    }
}

export const appendTrx = (trx) => {
    return {
        type: APPEND_TRX,
        payload:{
            trx
        }
    }
}