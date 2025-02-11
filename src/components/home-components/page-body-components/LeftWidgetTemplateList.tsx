import "./LeftWidgetTemplateList.scss";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {memo, useState} from "react";
import Sortable from "@/components/dnd-components/Sortable.tsx"


import { useSelector, useDispatch } from 'react-redux';
import {RootState} from "@/store"

const LeftWidgetTemplateList=memo(function () {
    const initializing=useSelector((state:RootState)=>state.main.initializing)||[];
    console.log("执行了左侧模板列表的重新渲染",initializing);

    return (
        <div className={"control-models"}>
            <div className="models-container">
                <SortableContext id={"left"} items={initializing} strategy={verticalListSortingStrategy}>
                    {initializing.length>0?initializing.map((item) => (
                        <Sortable id={item.id} key={item.id}>
                            <div className="model-item">
                                <i className={`iconfont ${item.icon}`}></i>
                                <span>{item.name}</span>
                            </div>
                        </Sortable>
                    )):<div>暂无物料模板</div>}
                </SortableContext>
            </div>
        </div>
    )
})

export default LeftWidgetTemplateList;