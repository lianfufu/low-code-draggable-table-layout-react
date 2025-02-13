import React, {memo, useMemo} from 'react';
// import {useDraggable} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import {IItem} from "@/components/dnd-components/dndManager/DNDDataTypes.ts";

function Sortable(props:{children:React.ReactNode,id:string,curComponent:IItem}) {
    const {attributes, listeners, setNodeRef, transform,transition,isOver} = useSortable({
        id: props.id,
        data:{
            curComponent:props.curComponent
        }
    });
    // console.log("Sortable无需重复渲染？，当内层的children发生变化时，自然是这规则；当Sortable父级被渲染，也要避免children产生新的实例，以防止Sortable又再次渲染了");
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const borderStyle=useMemo(() => {
        return {
            border: isOver ? '1px orange solid' : 'none',
        }
    },[isOver]);

    return (
        <div ref={setNodeRef} style={{...style,...borderStyle,width:"100%"}} {...listeners} {...attributes}>
            {props.children}
        </div>
    );
}
export default Sortable;