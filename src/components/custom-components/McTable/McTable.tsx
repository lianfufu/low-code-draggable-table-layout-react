import {useEffect, useMemo, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {getRandomCode} from "@/utils/globalMethods.ts";
import isEqual from "lodash/isEqual";

export type McTablePropsType={
    children?: any[],
    padding?: number,
    colCount?: number,
    rowCount?: number,
    model?: string,
    isShowBorder?: boolean,
    globalCellBgc?: string,
}
type McTableEventPropsType={
    updateRowCount:(row:number)=>void,
    updateColCount:(row:number)=>void,
    updateChildren:(children:any[])=>void
}

export default function McTable(props:McTablePropsType&McTableEventPropsType){
    const {
        children=[],
        padding=0,
        colCount=3,
        rowCount=2,
        model="top",
        isShowBorder=true,
        globalCellBgc="globalCellBgc",
        updateRowCount,
        updateColCount,
        updateChildren,
    }=props;
    const [tabData,setTabData]=useState<any[]>([]);
    const [columnWidths,setColumnWidths]=useState<number[]>([]);
    const [rowHeights,setRowHeights]=useState<number[]>([]);
    const [myColCount,setMyColCount]=useState(3);
    const [myRowCount,setMyRowCount]=useState(2);
    const [parentWidth,setParentWidth]=useState(430);
    const [cellIsMouseMove,setCellIsMouseMove]=useState(false);
    const [selectedMinRowIndex,setSelectedMinRowIndex]=useState(Number.NaN);
    const [selectedMaxRowIndex,setSelectedMaxRowIndex]=useState(Number.NaN);
    const [selectedMinColIndex,setSelectedMinColIndex]=useState(Number.NaN);
    const [selectedMaxColIndex,setSelectedMaxColIndex]=useState(Number.NaN);
    const [pickedRowIndex,setPickedRowIndex]=useState(Number.NaN);
    const [pickedColIndex,setPickedColIndex]=useState(Number.NaN);
    const [pickedRowSpan,setPickedRowSpan]=useState(Number.NaN);
    const [pickedColSpan,setPickedColSpan]=useState(Number.NaN);
    const [operationBarPosition,setOperationBarPosition]=useState({
        left: 0,
        top: 0,
    });
    const [isToChangeRowByNoneUI,setIsToChangeRowByNoneUI]=useState(false);
    const [isToChangeColByNoneUI,setIsToChangeColByNoneUI]=useState(false);
    const [isShowOperationBar,setIsShowOperationBar]=useState(false);
    const [writableIsClickTD,setWritableIsClickTD]=useState(false);
    const [isClickedAtOperationBar,setIsClickedAtOperationBar]=useState(false);

    const curComponent=useSelector((state:RootState)=>state.main.curComponent);
    const mytable=useRef(null);

    //初始化部分state（来自props）
    useEffect(() => {
        const tmpColumnWidth=[];
        const tmpRowHeights=[];
        for (let i = 0; i < colCount; i++) {
            tmpColumnWidth.push(100 / colCount);
        }
        for (let j = 0; j < rowCount; j++) {
            tmpRowHeights.push(40);
        }
        setColumnWidths(tmpColumnWidth);
        setRowHeights(tmpRowHeights);
    }, []);//首次渲染，才执行此处，用于更新行款尺寸

    //更新宽高（来自props）
    useEffect(() => {
        setMyColCount(colCount);
        if (!isToChangeColByNoneUI) {
            // 只要修改了列的个数，先前的列的宽度设置都将被重置
            const tmpColumnWidths = [];
            for (let i = 0; i < colCount; i++) {
                tmpColumnWidths.push(100 / colCount);
            }
            setColumnWidths(tmpColumnWidths);
        } else {
            setIsToChangeColByNoneUI(false);
        }
    }, [colCount]);

    const oldRowCount=useRef(rowCount);
    useEffect(() => {
        const value = rowCount;
        const oldValue = oldRowCount.current;

        setMyRowCount(value);
        if (value >= oldValue) {
            // 添加新行高度
            const newHeights = Array.from({ length: value - oldValue }, () => 40);
            setRowHeights(prev => [...prev, ...newHeights]);
        } else {
            if (!isToChangeRowByNoneUI) {
                // 删除多余行高度
                setRowHeights(prev => prev.slice(0, value));
            } else {
                setIsToChangeRowByNoneUI(false);
            }
        }

        oldRowCount.current=rowCount;
    }, [rowCount,isToChangeRowByNoneUI]);

    //todo 待校验思考
    useEffect(() => {
        //todo 应该不用比较新旧值采用isEqual
        setTabData(children);
    }, [children]);


    const tableDataArr2=useMemo(()=>{
        //todo 此useMemo的执行会在依赖项tabData执行前执行。此处可能有闪屏现象
        const res = [];
        const tdRowColIndexToRemove = [] as any[];

        for (let i = 0; i < rowCount; i++) {
            res[i]=[] as any[];
            for(let j=0; j<colCount; j++) {
                res[i][j] = [];
                //判断当前遍历的i，j是否属于被覆盖的单元格索引
                const matched = tdRowColIndexToRemove.findIndex(item => item.rowIndex === i && item.colIndex === j);
                if (matched !== -1) {
                    res[i][j] = [];
                    tdRowColIndexToRemove.splice(matched, 1);
                    continue;
                }
                //获取component.json中预定义的匹配rowindex和colindex的项
                const matchedChild = tabData.filter(item => item.rowIndex === i && item.colIndex === j);
                if (matchedChild && matchedChild.length > 0) {
                    if (matchedChild.length === 1) {
                        const first = matchedChild[0];
                        first.id = getRandomCode(8);
                        res[i][j] = [first];
                    } else {
                        res[i][j] = matchedChild;
                    }
                    const rowSpan = matchedChild[0].rowSpan;//认为多个同index的单元格的rowSpan数据一致
                    const colSpan = matchedChild[0].colSpan;//认为多个同index的单元格的colSpan数据一致
                    if (rowSpan !== 1 || colSpan !== 1) {
                        for (let k = i; k < rowSpan + i; k++) {
                            for (let l = j; l < colSpan + j; l++) {
                                if (k === i && l === j) {
                                    continue;
                                }
                                tdRowColIndexToRemove.push({
                                    rowIndex: k,
                                    colIndex: l
                                });
                            }
                        }
                    }
                }else{
                    res[i][j] = [{
                        id: getRandomCode(8),
                        component: "MCTextContainer",
                        rowIndex: i,
                        colIndex: j,
                        rowSpan: 1,
                        colSpan: 1,
                    }];
                }
            }
        }
        return res;
    },[tabData]);

    const isClickedTD=useMemo(()=>{
        if (!curComponent) {
            console.log("这里curComponent不存在才给的false");
            return false;
        }
        if (!curComponent.component || curComponent.component === "McTable" || curComponent.component === "MCTextContainer") {
            return true;//因为设定过当点击td，这个时候没有设置component属性
        }
        console.log("其他情况才给的false", curComponent.value, curComponent.component === "McTable");
        return false;
    },[curComponent]);

    useEffect(() => {
        if(myRowCount!==rowCount){
            updateRowCount(myRowCount);
        }
    }, [myRowCount]);
    useEffect(() => {
        if(myColCount!==colCount){
            updateColCount(myColCount);
        }
    }, [myColCount]);

    //清空选择单元格操作
    useEffect(() => {
        if(!isClickedTD){
            clearCurSelectedCells();
        }
    }, [isClickedTD]);

    useEffect(() => {
        if (!isShowOperationBar && !isClickedAtOperationBar) {
            clearCurSelectedCells();
        }
    }, [isShowOperationBar,isClickedAtOperationBar]);//todo 以前必须设置深监听才对,isClickedAtOperationBar要放到触发源中么？



    function getCellStyle(columnWidths:any, list:any, index:number) {
        const colSpan = list[0] ? list[0].colSpan : 1;
        let cellWidth = 0;
        for (let i = index; i < index + colSpan; i++) {
            cellWidth += columnWidths[i];
        }

        //todo 这种区别对待的，最好要做一个统一处理
        if (!list || list.length === 0) {
            return {
                width: cellWidth + "%",
                backgroundColor: globalCellBgc
            };
        }
        console.log(list[0].cellFieldsVal?.contentBgc || globalCellBgc);
        return {
            width: cellWidth + "%",
            padding: list[0].cellFieldsVal?.padding + 'px',
            backgroundColor: list[0].cellFieldsVal?.contentBgc ?? '#ffffff'
        }
    }





    //清除所有选择的单元格和隐藏操作栏
    function clearCurSelectedCells() {
        setSelectedMinColIndex(Number.NaN);
        setSelectedMaxColIndex(Number.NaN);
        setSelectedMinRowIndex(Number.NaN);
        setSelectedMinRowIndex(Number.NaN);
        setPickedColIndex(Number.NaN);
        setPickedRowIndex(Number.NaN);
        setPickedRowSpan(Number.NaN);
        setPickedColSpan(Number.NaN);
        console.log("执行了清理单元格所有的，为何？");
        setIsShowOperationBar(false);
    }

}
