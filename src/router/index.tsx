import Home from "../views/Home.tsx";
import Schema from "../views/Schema.tsx";
import {createBrowserRouter, Navigate} from "react-router-dom";
import App from "@/App.tsx";

// 定义路由配置
export const routes = [
    {
        path:"",
        element:<App/>,
        children: [
            {
                index:true,
                element:<Home/>
            },
            {
                path: '/',
                element: <Navigate to={""}/>,
            },
            {
                path: '/schema',
                element: <Schema/>,
            }
        ]
    }
];

export default createBrowserRouter(routes);