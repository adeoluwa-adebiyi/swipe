import { Button, Col, Layout, Row } from "antd";
import { NavLink } from "react-router-dom";
import Container from "../components/Container";

const { Header, Content } = Layout;

const style = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "",
    backgroundColor: "#ffffff",
    position: "relative",
    paddingLeft:0,
    paddingRight:0
}

export default (props) => {
    return (<Layout>
        <Header style={style}>
            <Container>
                <div style={style}>
                    <h3 style={{margin:0}}>Swipe</h3>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "end", alignSelf: "stretch", flex: 2 }}>
                        <Button type="primary"><NavLink to="/transfer">Launch App</NavLink></Button>
                    </div>
                </div>
            </Container>
        </Header>
        <Content>
            <Container style={{height:"30rem", color:"#fff", backgroundColor:"lightblue"}}>
                <Row style={{height:"100%"}}>
                    <Col xs={24} sm={24} md={24} style={{height:"100%", display: "flex",flexDirection:"column", justifyContent:"center"}}>
                        <h1 style={{marginTop:50, fontSize:"3em"}}>Powering Tether payments for businesses worldwide</h1>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                    </Col>
                </Row>
            </Container>
            <Row>
                <Col xs={24} sm={24} md={12}>

                </Col>
                <Col xs={24} sm={24} md={12}>
                    
                </Col>
            </Row>
        </Content>
    </Layout>)
}