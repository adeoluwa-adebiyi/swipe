import AppRouter from "./AppRouter";
import TransactionStoreProvider from "./stores/tokenTransactions";
import "./styles.css";
import "antd/dist/antd.css"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./stores/store";

export default function App() {
  return (
    <>
    <ToastContainer/>
    <Provider store={store}>
      <TransactionStoreProvider>
        <AppRouter />
      </TransactionStoreProvider>
    </Provider>
    </>
  );
}
