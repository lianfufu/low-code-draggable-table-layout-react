import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import {RouterProvider} from "react-router-dom";
import router from "./router"
import {Provider} from "react-redux";
import store from "./store";

import '@/utils/adapter.js'
// import {registerCustomComponents} from "@/dndManager/globalRegister"
console.log(import.meta.env);
createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
)
