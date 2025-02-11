import DropArea from "@/components/dnd-components/DropArea.tsx";
import WidgetShape from "@/components/control/WidgetShape.tsx";
import {useEffect, useState} from "react";
import isEqual from "lodash/isEqual"; // 使用深比较
import {produce} from "immer";
import {CurComponentType,setCurComponent} from "@/store/mainReducer.ts";
import {useDispatch} from "react-redux";
import McTitle from "@/components/custom-components/McTitle/McTitle.tsx";
import {IItem} from "@/components/dnd-components/dndManager/DNDDataTypes.ts";


type ControlNestWidgetPropsType={
    isWidget?:boolean;
    list:any[];
    cellRowIndex?:number;
    cellColIndex?:number;
    cellRowSpan?:number;
    cellColSpan?:number;
    updateTableChildData?:(item:any)=>void;
    updateList:(item:IItem[])=>void;
}
export default function ControlNestWidget({isWidget=false,list=[],cellRowSpan=Number.NaN,cellRowIndex=Number.NaN,cellColSpan=Number.NaN,cellColIndex=Number.NaN,updateList,updateTableChildData=(item:any)=>{}}:ControlNestWidgetPropsType){

    const [writableList, setWritableList] = useState<any[]>(list);
    const dispatch=useDispatch();
    // 监听父组件传入的 list 变化
    useEffect(() => {
        if (!isEqual(list, writableList)) {
            setWritableList(list);
        }
    }, [list]);

    useEffect(()=>{//当数据是为了列表进行服务的，拖进来新的对象的时候，记录要拖入的目标单元格
        if(!Number.isNaN(cellColIndex)&&!Number.isNaN(cellRowIndex)){
            console.log("提前走到了forEach中？",cellColIndex,cellRowIndex);
            const newWritableList=produce(writableList,draft=>{
                draft.forEach(item=>{
                    item.rowIndex=cellRowIndex;
                    item.colIndex=cellColIndex;
                    item.rowSpan=cellRowSpan;
                    item.colSpan=cellColSpan;
                    if(!item.cellFields){
                        item.cellFields={
                            "contentBgc": {
                                "label": "背景色",
                                "type": "color",
                                "value": "#fff"
                            },
                            "padding": {
                                "label": "内边距",
                                "type": "number",
                                "value": 3
                            }
                        }
                    }
                    if(!item.cellFieldVal){
                        item.cellFieldVal={};
                        for (const cellFieldsKey in item.cellFields) {
                            if(item.cellFields.hasOwnProperty(cellFieldsKey)){
                                if(item.cellFields[cellFieldsKey].value){
                                    item.cellFieldVal[cellFieldsKey]=item.cellFields[cellFieldsKey].value;
                                }
                            }
                        }
                    }
                });
                if(draft.length>1){
                    const mcTextContainerIndex=draft.findIndex(item=>item.component==='MCTextContainer');
                    if(mcTextContainerIndex!==-1){
                        console.log("执行了移除",mcTextContainerIndex,draft,draft.filter(item=>item.component==='MCTextContainer'));
                        draft.splice(mcTextContainerIndex,1);//移入单元格其他可拖拽元素后，单元格的MCTextContainer类型的item将被移除
                    }
                }
            });
            if (!isEqual(newWritableList, writableList)) {
                setWritableList(newWritableList); // 更新本地状态
            }
            updateList(newWritableList); // 通知父组件（类似 Vue 的 emits）
        }else{
            updateList(writableList);
        }
    },[writableList, cellRowIndex, cellColIndex, cellRowSpan, cellColSpan]);

    function deleteWidget(component:CurComponentType|null){
        if(!component){
            return;
        }
        console.log("执行删除失败-前半部");
        const newList = produce(writableList, (draft) => {
            const index = draft.findIndex((item) => item === component);
            if (index !== -1) draft.splice(index, 1);
        });
        setWritableList(newList);
        dispatch(setCurComponent(null));

        // console.log(store.curComponent);
        updateTableChildData(component);
        console.log("执行删除失败-后半部");
    }

    return (
        <div className={isWidget?'nest-widget-height':'outer-widget-height'}>
            {
                writableList?.length>0? list?.map(element=>(
                        element.component!=='MCTextContainer'&&
                        <WidgetShape deleteWidget={deleteWidget} curComponent={element} key={element.id} name={element.name}>
                            <McTitle/>
                        </WidgetShape>
                    )):
                    <DropArea parentId={"zero"} height={isWidget?"30px":"600px"}/>
            }
        </div>
    )
}