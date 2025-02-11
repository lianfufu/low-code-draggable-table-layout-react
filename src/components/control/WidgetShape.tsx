
import styles from "./WidgetShape.module.scss";
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from "@/store"
import {CurComponentType, setCurComponent} from "@/store/mainReducer.ts";

//如何看curComponent可能有id属性
//看看Widget是否可以做性能优化
export default function WidgetShape({name="物料实例",curComponent=null,deleteWidget,children}:{name?:string,curComponent?:CurComponentType|null,children:React.ReactNode,deleteWidget:(item:any)=>void}){
    const storeCurComponent=useSelector((state:RootState)=>state.main.curComponent);
    const isSelected=storeCurComponent?.id===curComponent!.id;
    const dispatch=useDispatch();

    function stopPropagation(event){
        event.stopPropagation();
    }
    function doSetCurComponent(event){
        stopPropagation(event);
        console.log("点击后设置store的curComponent的值",curComponent);
        dispatch(setCurComponent(curComponent));
    }
    function doDeleteComponent(event){
        stopPropagation(event);
        deleteWidget(curComponent);
    }

    return (
        <div className={`${styles.widgetShape} ${styles.drag}`} onClick={(event=>doSetCurComponent(event))}>
            <div className={styles.operateBar}>
                {
                    isSelected?<div className="f14" onClick={(event => doDeleteComponent(event))}>x</div>:
                        <div className="f14" onClick={(event=>stopPropagation(event))}>{ name }</div>
                }
            </div>
            {children}
        </div>
    )
}