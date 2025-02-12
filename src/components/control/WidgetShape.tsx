
import styles from "./WidgetShape.module.scss";
import React, {useEffect, useRef} from "react";
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from "@/store"
import {CurComponentType, setCurComponent} from "@/store/mainReducer.ts";


//如何看curComponent可能有id属性
//看看Widget是否可以做性能优化
export default function WidgetShape({name="物料实例",curComponent=null,deleteWidget,children}:{name?:string,curComponent?:CurComponentType|null,children:React.ReactNode,deleteWidget:(item:any)=>void}){
    const storeCurComponent=useSelector((state:RootState)=>state.main.curComponent);
    const isSelected=storeCurComponent?.id===curComponent!.id;
    const dispatch=useDispatch();

    const widgetShapeDiv=useRef<HTMLDivElement>(null);
    // useEffect(() => {
    //     if(widgetShapeDiv.current){
    //         widgetShapeDiv.current.addEventListener("click",()=>{
    //             console.log("dian击了最外层div");
    //         },true);
    //     }
    // }, []);
    function stopPropagation(event){
        event.stopPropagation();
    }
    function doSetCurComponent(event){
        stopPropagation(event);
        dispatch(setCurComponent(curComponent));
    }
    function doDeleteComponent(event){
        console.log("执行了删除widgetshape");
        stopPropagation(event);
        deleteWidget(curComponent);
    }

    return (
        <div ref={widgetShapeDiv} className={`${styles.widgetShape} ${styles.drag}`} onClick={(event)=>doSetCurComponent(event)}>
            <div className={styles.operateBar}>
                {
                    isSelected?<div data-no-drag="true" className="f14" onClick={(event )=> doDeleteComponent(event)}>x</div>:
                        <div className="f14" onClick={(event)=>stopPropagation(event)}>{ name }</div>
                }
            </div>
            {children}
        </div>
    )
}