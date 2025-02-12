import "./PageBody.scss"
import LeftWidgetTemplateList from "@/components/home-components/page-body-components/LeftWidgetTemplateList.tsx";
import {useMemo, useState} from "react";
import {flatten} from "@/components/dnd-components/dndManager/DNDDataUtils.ts";
import {IFlattenedItem, IItem} from "@/components/dnd-components/dndManager/DNDDataTypes.ts";
import {DragEndEvent, DragMoveEvent, DragOverlay, DragStartEvent, UniqueIdentifier} from "@dnd-kit/core";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import genNewItems, {findActiveItem} from "@/components/dnd-components/dndManager/NewItemGenerationManager.ts";
import cloneInsertActiveItem from "@/components/dnd-components/dndManager/CloneItemInsertManger.ts";
import MyDNDContext from "@/components/dnd-components/MyDNDContext.tsx";
import ControlNestWidget from "@/components/control/ControlNestWidget.tsx";
import DragOverlayContent from "@/components/home-components/page-body-components/DragOverlayContent.tsx";
import CustomSchemaTemplate from "@/components/control/CustomSchemaTemplate.tsx";
import {selectCurFields} from "@/store/mainReducer.ts";
export default function PageBody(){
    const {
        items,
        setItems,
        activeId,
        activeItem,
        handleDragStart,
        handleDragMove,
        handleDragEnd
    } = ManagerDNDItems();

    // const [widgets,setWidgets] = useState<any[]>([]);
    // const handlerUpdateTableChildData=(list:any[])=>{
    //     setWidgets(list);
    // }

    const curComponent=useSelector((state:RootState)=>state.main.curComponent);
    const curFields=useSelector((state:RootState)=>selectCurFields(state));

    const handlerUpdateList=(items:IItem[])=>{
        setItems(items);
    }

    return (
        <div className="body">
            <MyDNDContext handleDragEnd={handleDragEnd} handleDragStart={handleDragStart} handleDragMove={handleDragMove}>
                <LeftWidgetTemplateList/>
                <div className="control-page">
                    <div className="panel">
                        <div className="panel-content">
                            <ControlNestWidget list={items} updateList={handlerUpdateList}/>
                        </div>
                    </div>
                </div>
                <DragOverlay>
                    <DragOverlayContent activeItem={activeItem}/>
                </DragOverlay>
            </MyDNDContext>
            <div className="control-config">
                {
                    curComponent&&<CustomSchemaTemplate curFields={curFields} component={curComponent}/>
                }
                <div className="widget-config-source">
                    <span style={{color:'dodgerblue'}} className="f13">物料数据：</span>
                    {curComponent?
                        <div>json数据</div>:
                        (<span style={{wordBreak: "break-all", wordWrap: "break-word"}}>无</span>)}
                </div>
            </div>
        </div>
    )
}

function ManagerDNDItems(){
    const [items,setItems]=useState<IItem[]>([] as IItem[]);
    const flattenedItems = useMemo(
        () => flatten(items as IFlattenedItem[]),
        [items]
    )

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null); // 当前拖拽的 item ID
    const [overId, setOverId] = useState<UniqueIdentifier | null>(null); // 当前鼠标悬停的 item ID

    // 获取当前拖拽的 item
    const initializing=useSelector((state:RootState)=>state.main.initializing)||[];
    let activeItem = initializing.find(item => item.id === activeId);
    if(!activeItem) {
        activeItem=findActiveItem(items,activeId as string);
    }

    // 拖拽开始
    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id);
    }

    // 拖拽移动
    const handleDragMove = (event: DragMoveEvent) => {
        const { over } = event;
        console.log("移动了鼠标");
        setOverId(over?.id || null);
    }

    const handleDragEnd = function (event: DragEndEvent) {
        const { active, over } = event;
        if (over == null) return
        if(over.data.current?.sortable.containerId==="left") return
        if (active.id === over.id) return

        const { ancestorIds: overAncestorIds = [] } = over.data.current || {}
        if (overAncestorIds.includes(active.id)) {
            console.log('Cannot drop item into its descendant')
            return
        }
        const isCloneItem = active.data.current?.sortable.containerId==="left";
        //判断拖入的是否为drop area
        let isInsertIntoChildren=false;
        let parentId="";
        if((over.id as string).includes("container")){
            parentId = (over.id as string).split("container")[1];
            isInsertIntoChildren=true;
        }
        let inputOverId=isInsertIntoChildren?parentId:over.id.toString();
        const overIndex = flattenedItems.findIndex((i) => i.id === overId);
        console.log(items,{...activeItem,id:activeItem.id+'-copy'+Date.now()},flattenedItems,inputOverId,overIndex,isInsertIntoChildren);
        const newItems =!isCloneItem? genNewItems(
            items,
            flattenedItems,
            active.id.toString(),
            inputOverId,
            isInsertIntoChildren
        ):cloneInsertActiveItem(items,{...activeItem,id:activeItem.id+'-copy'+Date.now()},inputOverId,overIndex,isInsertIntoChildren);
        console.log('newItems...', newItems)
        setItems(newItems)

        setActiveId(null); // 重置 activeId
        setOverId(null); // 重置 overId
    };

    return {
        items,
        activeId,
        setItems,
        activeItem,
        handleDragStart,
        handleDragMove,
        handleDragEnd
    }
}