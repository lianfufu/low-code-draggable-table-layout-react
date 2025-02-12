
import {IItem} from "@/components/dnd-components/dndManager/DNDDataTypes.ts";
import React, {useMemo} from "react";
import McTitle from "@/components/custom-components/McTitle/McTitle.tsx";
import McContainer from "@/components/custom-components/McContainer/McContainer.tsx";
import Sortable from "@/components/dnd-components/Sortable.tsx";

type McComponentPropsType={
    children?:React.ReactNode,
    curComponent:IItem,
    id?:string,
    opacity?:number,
    [index:string]:unknown
}
const ComponentsCollection={
    McContainer,
    McTitle
}
export default function McComponent(props:McComponentPropsType&{is:string}){
    const {curComponent,id="",...otherProps}=props;

    const memoId=useMemo(()=>{
        if(!id){
            return Date.now()+Math.floor(Math.random() * 1000)+''
        }
        return id
    },[]);

    const InnerCompnent=ComponentsCollection[props.is];

    return (
        <Sortable id={memoId} curComponent={curComponent}>
            <InnerCompnent {...otherProps}/>
        </Sortable>
    )
}