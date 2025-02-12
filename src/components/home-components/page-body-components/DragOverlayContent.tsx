import {useSelector} from "react-redux";
import McTitle from "@/components/custom-components/McTitle/McTitle.tsx";
import McContainer from "@/components/custom-components/McContainer/McContainer.tsx";
import ControlNestWidget from "@/components/control/ControlNestWidget.tsx";
import McComponent from "@/components/custom-components/McComponent.tsx";

export default function DragOverlayContent({activeItem}:{activeItem:object|null}){
    const curComponent=useSelector((state)=>state.main.curComponent);
    return !activeItem?"":((activeItem.id.includes("copy")&&curComponent)?
        (
            // curComponent.name==="标题"?
            //     <McComponent is={curComponent.component} opacity={0.5} curComponent={curComponent} id={curComponent.id}/>:
            //     curComponent.name==="容器"?
            //         // (<BasicMcComponent is={"McContainer"} opacity={0.5} curComponent={curComponent} id={curComponent.id}>
            //         //     <ControlNestWidget parentId={curComponent.id} list={curComponent.children} updateList={(value)=>{}} isWidget={true}/>
            //         // </BasicMcComponent>):
            //         (<McComponent is={curComponent.component} opacity={0.5} curComponent={curComponent} id={curComponent.id}>
            //             <ControlNestWidget parentId={curComponent.id} list={curComponent.children} updateList={(value)=>{}} isWidget={true}/>
            //         </McComponent>):
            //         ""
            <McComponent is={curComponent.component} curComponent={curComponent} id={curComponent.id}>
                {curComponent.component==="McContainer"&&
                    <ControlNestWidget parentId={curComponent.id} list={curComponent.children}
                                       updateList={(value)=>{}} isWidget={true}/>}
            </McComponent>
        )://代表拖拽中间区域
        <div style={{ padding: '3px', border: '1px solid #ccc', backgroundColor: 'lightblue' }}>
            {activeItem?.name}
        </div>)//代表拖拽左侧区域

}