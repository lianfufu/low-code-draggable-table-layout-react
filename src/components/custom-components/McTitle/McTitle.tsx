import Sortable from "@/components/dnd-components/Sortable.tsx";
import React, {useCallback, useEffect, useMemo, useRef} from "react";
import {IItem} from "@/components/dnd-components/dndManager/DNDDataTypes.ts";

type McTitlePropsType={
    title?:string,
    model?:string,
    opacity?:number,
    styles?:{
        titleColor:string,
        titleSize:string,
    },
}

export default function McTitle({title="defaultText",model="left",styles={},opacity=1}:McTitlePropsType) {
    console.log("McTitle重新渲染了",title);
    const titleStyles=useMemo(()=>{
        if(!styles||JSON.stringify(styles)==="{}"){
            return {
                fontSize:"20px",
                color:"black",
                textAlign:"left"
            }
        }else{
            return{
                fontSize:styles.titleSize+"px",
                color:styles.titleColor!,
                textAlign:model!,
            }
        }
        return {}
    },[title,model,styles]);//传递给自定义组件的对象要memo化处理，以防止重复渲染子组件
    return (
        <div style={{...titleStyles,opacity}}>{title}</div>
    )
}
