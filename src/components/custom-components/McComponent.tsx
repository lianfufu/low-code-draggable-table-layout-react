
import {IItem} from "@/components/dnd-components/dndManager/DNDDataTypes.ts";
import React, {useMemo} from "react";
import McTitle from "@/components/custom-components/McTitle/McTitle.tsx";
import McContainer from "@/components/custom-components/McContainer/McContainer.tsx";
import Sortable from "@/components/dnd-components/Sortable.tsx";
import McImg from "@/components/custom-components/McImg/McImg.tsx";
import McTab from "@/components/custom-components/McTab/McTab.tsx";

type McComponentPropsType={
    children?:React.ReactNode,
    curComponent:IItem,
    id?:string,
    opacity?:number,
    [index:string]:unknown
}
const ComponentsCollection={
    McContainer,
    McTitle,
    McImg,
    McTab
}
export default function McComponent(props:McComponentPropsType&{is:string}){
    const {curComponent,id="",...otherProps}=props;
    console.log("McComponent重新渲染了",otherProps);
    const memoId=useMemo(()=>{
        if(!id){
            return Date.now()+Math.floor(Math.random() * 1000)+''
        }
        return id
    },[]);

    const InnerCompnent=ComponentsCollection[props.is];
    const {children,...curComponentExceptChildren}=curComponent;
    return (
        <Sortable id={memoId} curComponent={curComponent}>
            <InnerCompnent {...otherProps} {...curComponentExceptChildren}/>
        </Sortable>
    )
}