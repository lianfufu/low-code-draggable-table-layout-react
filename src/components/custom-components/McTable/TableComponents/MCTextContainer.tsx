import React, {useMemo} from "react";
import {useDroppable} from "@dnd-kit/core";


type McTextContainerPropsType={
    containerHeight?:number,
    contentBgc?:string,
    children?:React.ReactNode
}

export default function McTextContainer({containerHeight=30,contentBgc="#fff",children=""}:McTextContainerPropsType){
    const parentId=useMemo(()=>Date.now()+Math.floor(Math.random() * 1000),[]);
    const getCoreContentStyle={
        minHeight: containerHeight+'px',
        backgroundColor: contentBgc,
    }
    return (
        <div style={{height:containerHeight+'px'}}>
            <TextContainerDropArea parentId={parentId}>
                {children as React.ReactNode}
            </TextContainerDropArea>
        </div>
    )
}

function TextContainerDropArea({ children='',parentId=""}: { children?:React.ReactNode,parentId?:string|number,height?:string }) {
    const id=useMemo(()=>Date.now()+Math.floor(Math.random() * 1000)+'container'+parentId,[]);
    // const memoId=useMemo(()=>{
    //     if(!parentId){
    //         return Date.now()+Math.floor(Math.random() * 1000)+'container'+parentId
    //     }
    //     return Date.now()+Math.floor(Math.random() * 1000)+'zero'//代表
    // },[]);
    const { setNodeRef,isOver } = useDroppable({ id:id });
    console.log("DropArea重新渲染");

    const overBorderStyle = {
        border: isOver ? '1px purple solid' : 'none',
    }

    return (
        <div
            ref={setNodeRef}
            style={{...overBorderStyle}}
        >
            {children}
        </div>
    );
}