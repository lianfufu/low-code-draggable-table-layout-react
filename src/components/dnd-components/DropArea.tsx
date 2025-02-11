import {useMemo} from "react";
import {useDroppable} from "@dnd-kit/core";

export default function DropArea({ children='drop here',parentId,height="30px"}: { children?:React.ReactNode,parentId:string|number,height?:string }) {
    const id=useMemo(()=>Date.now()+Math.floor(Math.random() * 1000)+'container'+parentId,[]);
    const { setNodeRef,isOver } = useDroppable({ id:id });
    console.log("DropArea重新渲染");

    const overBorderStyle = {
        border: isOver ? '1px purple solid' : '1px solid #ccc',
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