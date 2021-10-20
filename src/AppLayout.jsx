import { BankOutlined, CaretDownOutlined, MoneyCollectOutlined, ReloadOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import React,{ useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import { useTransactionsStore } from "./stores/tokenTransactions";
import WalletConnectRequiredModal from "./components/WalletConnectRequiredModal";
import DropdownButton from "antd/lib/dropdown/dropdown-button";
import useResponsive from "./Responsive";
import ButtonGroup from "antd/lib/button/button-group";


const { Content, Header } = Layout;

const AccountDropdown = (props) =>{

    const store = useTransactionsStore();

    const wallet = store.getWallet();

    const connected = store.getConnected();

    return (
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"end", alignSelf:"stretch", flex:2}}>
            <ButtonGroup>
                <Button type="primary">
                    {store.getWallet().address?(store.getWallet().address?.slice(0,6)+"..."):"N/A"}
                </Button>
                <Button type="danger">
                    <span>{`$${wallet.balance??"..."}`}</span>
                </Button>
            </ButtonGroup>
        </div>
    )
}

const AppMenuItem = ({children,...otherProps}) => {
    return (
        <MenuItem style={{height:40, paddingTop:0, paddingBottom:0, margin:0, boxSizing:"content-box"}} {...otherProps}>
            {children}
        </MenuItem>
    )
}

export default (Component) => {

    return React.memo((props) => {

        const { path } = useRouteMatch();

        const [activePath, setActivePath] = useState(path);

        const store = useTransactionsStore();
    
        useEffect(()=>{

        },[])

        const {isTabletOrMobile, isTablet, isMobile} = useResponsive();

        const menuStyle = { 
            display: "flex", 
            flexDirection: "row", 
            justifyContent: isMobile?"flex-start":"center", 
            overflowX: "scroll",
            overflowY: "hidden",
            paddingLeft: 0
        };
        
        const headerStyle = { backgroundColor: "#303e52", position: "relative", display:"flex", flexDirection:"row" };

        return (<Layout>
            <WalletConnectRequiredModal/>
            <Header style={headerStyle}>
                <div className="logo">
                    <h1><NavLink to="/">Swipe</NavLink></h1>
                </div>
                {store.getConnected()?<AccountDropdown/>:null}
            </Header>
            <Menu 
                    disabledOverflow={true}
                    style={menuStyle}
                    activeKey={activePath}
                    mode="horizontal">
                    {/* <MenuItem title="Home" key={"/"}>
                        <NavLink>
                            Home
                        </NavLink>
                    </MenuItem> */}
                    <AppMenuItem icon={<SendOutlined size={30}/>} title="Home" key={"/transfer"}>
                        <NavLink to={"/transfer"}>
                            Transfer
                        </NavLink>
                    </AppMenuItem>
                    <AppMenuItem icon={<MoneyCollectOutlined size={30}/>} title="Transactions" key={"/transactions"}>
                        <NavLink to="/transactions">
                            Transactions
                        </NavLink>
                    </AppMenuItem>
                    <AppMenuItem icon={<BankOutlined size={30}/>} title="Exchange" key={"/exchange"}>
                        <a href="https://uniswap.com" target={"_blank"}>
                            Exchange
                        </a>
                    </AppMenuItem>
                </Menu>
            <Content style={{position:"relative"}}>
                <Component {...props} />
            </Content>

        </Layout>);
    })
}