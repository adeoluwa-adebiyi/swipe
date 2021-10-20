import { Redirect } from "react-router-dom";
import Index from "./pages/Index";
import TransactionsScreen from "./pages/TransactionsScreen";
import TransferScreen from "./pages/TransferScreen";

export default [
    { path: "/", component: (props)=><Redirect to={"/transfer"}></Redirect>, exact: true },
    { path: "/transfer", component: TransferScreen, exact: false },
    { path: "/transactions", component: TransactionsScreen, exact: false },
];
