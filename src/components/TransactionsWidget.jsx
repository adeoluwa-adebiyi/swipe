import { Card } from "antd";
import { useTransactionsStore } from "../stores/tokenTransactions";
import { cardStyle } from "../styles";
import useResponsive from "../Responsive";

const style = {...cardStyle, height:"100%", marginBottom:"15%", overflowY:"scroll"};

const generateScannerPath = (trx) => {
    switch(trx.trxType){
        case "bep20": 
            return `https://bscscan.com/tx/${trx.hash}`;

        case "erc20":
            return `https://etherscan.io/tx/${trx.hash}`;

        default:
            return "#";
    }
}

const TransactionCard = ({trx}) => {
    return <Card style={{fontSize:"0.8em"}}>
        <p style={{wordWrap:"break-word"}}><strong>Transaction Id:</strong> &nbsp;{trx.hash}</p>
        <p style={{wordWrap:"break-word"}}><strong>From:</strong> &nbsp;{trx.from}</p>
        <p style={{wordWrap:"break-word"}}><strong>To:</strong> &nbsp;{trx.to}</p>
        <a target={"_blank"} href={generateScannerPath(trx)}>View details</a>
    </Card>
}

export default (props) => {
    const store = useTransactionsStore();
    const {isTabletOrMobile} = useResponsive();
    const transactionsWidgetStyle = isTabletOrMobile?{...style, minWidth:"100%"} :style;
    return (
        <div style={transactionsWidgetStyle}>
            <h3 style={{ margin: 0, fontWeight: "bolder" }}>Transactions</h3>
            <p style={{ color: "#666666" }}>View recent USDT transactions</p>
            <div style={{marginTop: 20}}>
                {store.trx.map((trx) => <TransactionCard trx={trx}/>)}
            </div>
        </div>
    )
}