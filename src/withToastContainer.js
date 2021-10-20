import { ToastContainer } from "react-toastify";

export default (Component) => {
    return (props)=>
        <Component {...props}/>
}