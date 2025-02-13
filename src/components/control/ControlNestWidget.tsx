import DropArea from "@/components/dnd-components/DropArea.tsx";
import WidgetShape from "@/components/control/WidgetShape.tsx";
import {useEffect, useState} from "react";
import isEqual from "lodash/isEqual"; // 使用深比较
import {produce} from "immer";
import {CurComponentType,setCurComponent} from "@/store/mainReducer.ts";
import {useDispatch} from "react-redux";
import McComponent from "@/components/custom-components/McComponent.tsx";
import {IItem} from "@/components/dnd-components/dndManager/DNDDataTypes.ts";
import McContainer from "@/components/custom-components/McContainer/McContainer.tsx";
import McTitle from "@/components/custom-components/McTitle/McTitle.tsx";


type ControlNestWidgetPropsType={
    isWidget?:boolean;
    list:any[];
    parentId?:string|number;
    cellRowIndex?:number;
    cellColIndex?:number;
    cellRowSpan?:number;
    cellColSpan?:number;
    updateTableChildData?:(item:any)=>void;
    updateList:(item:IItem[])=>void;
}
export default function ControlNestWidget({isWidget=false,list=[],cellRowSpan=Number.NaN,cellRowIndex=Number.NaN,cellColSpan=Number.NaN,cellColIndex=Number.NaN,parentId="",updateList,updateTableChildData=(item:any)=>{}}:ControlNestWidgetPropsType){

    const [writableList, setWritableList] = useState<any[]>(list);
    const dispatch=useDispatch();
    // 监听父组件传入的 list 变化
    useEffect(() => {
        if (!isEqual(list, writableList)) {
            console.log("执行了ControlNestWidget重新渲染",list);
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
            updateList(newWritableList); // 通知父组件（类似 Vue 的 emits），如果是双层嵌套表格，此处便不再奏效了
        }else{
            updateList(writableList);//直接调用外层setItems把writableList传进去是否妥当，好像挺对的。但是谁有能确保writableList一直是最外层的那个list呢。
            //合理的思路是，当curComponent发生改变时，每一层的useEffect都要监听变化。判断
        }
    },[writableList, cellRowIndex, cellColIndex, cellRowSpan, cellColSpan]);//由于修改curComponent，不会影响到writableList深层次的值，因此此处就算是深层次监听其变化也都无效了。但拖入内容做深层次监听还是有必要的

    function deleteWidget(component:CurComponentType|null){
        if(!component){
            return;
        }
        console.log("执行删除失败-前半部");
        const matchedIndex = writableList.findIndex((item) => item === component);
        const newList = produce(writableList, (draft) => {
            // const index = draft.findIndex((item) => Object.is(item,component));
            // console.log(draft,writableList);
            // console.log("index",index);//-1
            if (matchedIndex !== -1) draft.splice(matchedIndex, 1);
        });
        console.log("newList",newList,writableList[0]===component);//true
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
                            <McComponent is={element.component} curComponent={element} id={element.id}>
                                            {element.component==="McContainer"&&
                                                <ControlNestWidget parentId={element.id} list={element.children}
                                                                updateList={(value) => {
                                                                    updateList(value);

                                                                }} isWidget={true}/>}
                            </McComponent>
                        </WidgetShape>
                    )):
                    <DropArea parentId={parentId||"zero"} height={isWidget?"30px":"800px"}>{isWidget?"":"drop here"}</DropArea>
            }
        </div>
    )
}