import { Layout } from "antd"

export default ({children, style, fluid=false,...otherProps}) => {
    const fluidStyle = fluid?{paddingLeft:"7%", paddingRight:"7%"}:{paddingLeft:"15%", paddingRight:"15%"}
    return (<Layout style={{...fluidStyle,height:"100%",background:"transparent", position:"relative",height:"100vh",...style}} {...otherProps}>
        {children}
    </Layout>)
}