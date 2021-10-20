import Container from "../components/Container";
import withAppLayout from "../AppLayout";
import { TransferWidget } from "../components/TransferWidget";
import withStoreBridge from "../StoreBridge";

const transferScreenStyle = { 
  display: "flex", 
  flexDirection: "column", 
  marginTop:40,
  alignItems: "center" 
};

const TransferScreen = (props) => {
  return (
    <Container fluid style={transferScreenStyle}>
      <TransferWidget />
    </Container>
  );
};


export default withStoreBridge(withAppLayout(TransferScreen));
