import { useEffect } from "react"
import { TRX_LOCAL_STORE_KEY } from "./constants/appData"
import { useTransactionsStore } from "./stores/tokenTransactions"

export default (Component) => {
    return (props) => {
        const store = useTransactionsStore()
        useEffect(()=>{
            localStorage.setItem(TRX_LOCAL_STORE_KEY,JSON.stringify(store.trx));
        },[store.trx]);
        return (<Component  {...props}/>)
    }
}