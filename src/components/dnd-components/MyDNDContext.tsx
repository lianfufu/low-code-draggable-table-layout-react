import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent, DragStartEvent, DragMoveEvent, pointerWithin,
} from '@dnd-kit/core'
import {
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import React, {memo} from "react";
import {DragOverEvent} from "@dnd-kit/core/dist/types";
import {useDispatch} from "react-redux";
import {setCurComponent} from "@/store/mainReducer.ts";
import {CustomMouseSensor} from "@/components/dnd-components/dndManager/CustomMouseSensor.ts";

type DNDContextProps={
    handleDragEnd:(e: DragEndEvent) => void,
    handleDragStart:(e: DragStartEvent) => void,
    handleDragMove:(e: DragMoveEvent) => void,
    children:React.ReactNode
}

const MyDNDContext =memo(function (props:DNDContextProps) {
    console.log("执行了MyDNDContext重新渲染");
    const {handleDragEnd,children,...otherProps} = props;
    const sensors = useSensors(
        useSensor(CustomMouseSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    //管理选择的item的当前状态
    const dispath=useDispatch();
    function handleDragOver(event: DragOverEvent){
        if(event.active.data.current?.sortable.containerId!=="left"){
            if(event.active.data.current?.curComponent){
                dispath(setCurComponent(event.active.data.current?.curComponent));
            }
        }
        console.log(event.over,"鼠标over")
    }
    return <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragEnd={handleDragEnd}
        onDragStart={props.handleDragStart}
        onDragOver={handleDragOver}
        {...otherProps}
    >
        {children}
    </DndContext>
});
export default MyDNDContext;