import { AlertFilled } from "@ant-design/icons";
import { Button, Modal, Spin } from "antd";
import { toast } from "react-toastify";
import {Suspense, useState, useEffect} from "react"
import { requestWalletConnection } from "../services/payments";
import { useTransactionsStore } from "../stores/tokenTransactions";

const modalStyle = { 
    width: "60%", 
    height: "60%", 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    justifyContent: "center",
    borderRadius: "10px"
};

export default (props) => {
    const store = useTransactionsStore();

    const connectWallet = async() =>{
        try{
            const wallets = await requestWalletConnection();
            if(wallets){
                store.setWallet({address: wallets[0]});
            }
        }catch(e){
            toast.error("Wallet connection failed.",{position:"top-center"});
        }
    }

    const persistWalletBalance = async() => {
        if(store.getWallet().address!=null){
            try{
                const balance = await getWalletBalance(store.getWallet().address)
                store.setWallet({balance});
            }catch(e){
                console.log(e)
            }
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            const addresses = window.ethereum._state.accounts;
            store.setConnected(addresses>0);
            if(addresses>0){
                store.setWallet({address: addresses[0]});
                store.fetchWalletBalance(addresses[0]);
            }
        },1000)

    },[]);

    useEffect(()=>{
        return () => {
            window.ethereum.removeAllListeners();
        }
    },[])

    window.ethereum.on('accountsChanged', (accounts) =>{
        if(accounts.length > 0){
            store.setConnected(true)
        }else{
            store.setConnected(false);
        }
    });

    
    return (
        <Suspense fallback={<Spin/>}>
        <Modal onCancel={null} onOk={null} footer={null} title="Attention" style={modalStyle} visible={!store.getConnected()}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <AlertFilled style={{marginTop:40}} style={{fontSize:"2em", color:"red"}} size={100}/>
                <h4 style={{marginTop:20}}>Wallet Connection required!</h4>
                <Button type="primary" style={{marginTop:40}} onClick={connectWallet}>Connect Wallet</Button>
            </div>
        </Modal>
        </Suspense>
    )
}