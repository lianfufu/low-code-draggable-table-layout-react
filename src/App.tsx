import {Outlet} from "react-router-dom";
import {initCustomComponentsConfig} from "@/utils/myGlobalSchemaRegister.ts";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

function App() {
    console.log("app重新渲染了");
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("看是否会dispatch发生变化");
        initCustomComponentsConfig(dispatch);
    }, [dispatch]);
  return (
      <Outlet/>
  )
}

export default App
