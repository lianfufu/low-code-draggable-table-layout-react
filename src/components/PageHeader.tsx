import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import "./PageHeader.scss";

export default function PageHeader() {
    const navigate=useNavigate();
    const navigateToSchema=()=>{
        navigate("/schema");
    }
    return (
        <header>
            <span>可视化平台搭建</span>
            <Button type={'primary'} onClick={navigateToSchema}>schema</Button>
        </header>
    )
}