import Container from "../components/Container";
import withAppLayout from "../AppLayout";
import TransactionsWidget from "../components/TransactionsWidget";
import withStoreBridge from "../StoreBridge";

const style = { 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    marginTop: 40 
};

const TransactionsScreen = (props) => {
    return (
        <Container  fluid style={style}>
            <TransactionsWidget/>
        </Container>
    )
}

export default withStoreBridge(withAppLayout(TransactionsScreen));