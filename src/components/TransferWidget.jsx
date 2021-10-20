import { useTransactionsStore } from "../stores/tokenTransactions";
import { payWithUSDTBEP, payWithUSDTERC } from "../services/payments";
import { toast } from "react-toastify";
import { TransferTokenForm } from "./TransferTokenForm";
import { cardStyle } from "../styles";
import useResponsive from "../Responsive";



export const TransferWidget = (props) => {
  const store = useTransactionsStore();

  const {isTabletOrMobile} = useResponsive();
  const transferWidgetStyle = isTabletOrMobile?{...cardStyle, minWidth:"100%"} :cardStyle;

  const handleTransaction = async (payment) => {
    try {
      store.setLoadingTrx(true);
      const response = await payment();
      if(response){
        store.setLoadingTrx(false);
        toast.success("Done. Status can be viewed in transaction section.", { position: "top-center" });
        // store.addTrx(response);
      }
      return response;
    } catch (e) {
      store.setLoadingTrx(false);
      if (e.code === "INVALID_ARGUMENT") {
        toast.error("Invalid Amount or Receipient Address", { position: "top-center" });
      }
      if (e.code === -32603) {
        toast.error(e.data.message, { position: "top-center" });
      }
      else {
        toast.error("Tranfer initiation failed. Ensure your wallet is well-funded for this transaction", { position: "top-center" });
      }
    }
  };

  const handleFinish = async (values) => {
    const { address, amount, erc } = values;

    switch (erc) {
      case "BEP20":
        const btrx = await handleTransaction(() => payWithUSDTBEP(amount, address));
        if(btrx)
          store.addTrx({...btrx, trxType:"bep20"});
        break;

      case "ERC20":
        const etrx = await handleTransaction(() => payWithUSDTERC(amount, address));
        if(etrx)
          store.addTrx({...etrx, trxType:"erc20"});
        break;

      // case "TRC20":
      //   console.log(await payWithUSDTTRC(amount, address));
      //   break;
      default:
        toast.info(`Support for ${erc} is coming soon.`);
    }
  };

  return (
    <div style={transferWidgetStyle}>
      <h3 style={{ margin: 0, fontWeight: "bolder" }}>Transfer</h3>
      <p style={{ color: "#666666" }}>Send USDT tokens in an instant!</p>

      <TransferTokenForm busy={store.getLoadingTrx()} onFinish={handleFinish} />
    </div>
  );
};
