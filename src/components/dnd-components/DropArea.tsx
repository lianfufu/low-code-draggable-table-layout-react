import {useMemo} from "react";
import {useDroppable} from "@dnd-kit/core";

export default function DropArea({ children='',parentId="",height="30px"}: { children?:React.ReactNode,parentId?:string|number,height?:string }) {
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
            style={{padding: '10px', border: '1px dashed #ccc', height, ...overBorderStyle}}
        >
            {children}
        </div>
    );
}