import {useEffect, useState} from "react";
import styles from "./CellOperationBar.module.scss";
import {Button, InputNumber} from "antd";

type CellOperationBarPropsType={
    positionVal:object,
    isClickedAtOperationBar:boolean,
}
type CellOperationBarEventPropsType={
    updateCurCellSplitInfo:(rowCount:number,colCount:number)=>void,
    doMergeCells:(rowCount:number,colCount:number)=>void,
    doDeleteRow:()=>void,
    doDeleteCol:()=>void,
    updateIsClickedAtOperationBar:(item:any)=>void,
}
export default function CellOperationBar({positionVal={left:0,right:0},isClickedAtOperationBar=false,updateCurCellSplitInfo,doMergeCells,doDeleteRow,doDeleteCol,updateIsClickedAtOperationBar}:CellOperationBarPropsType&CellOperationBarEventPropsType){
    const [isShowPop,setIsShowPop]=useState(false);
    const [myRowCount,setMyRowCount]=useState(1);
    const [myColCount,setMyColCount]=useState(1);
    const [myIsClickedAtOperationBar,setMyIsClickedAtOperationBar]=useState(false);

    useEffect(() => {
        setMyIsClickedAtOperationBar(isClickedAtOperationBar);
    }, []);

    useEffect(() => {
        if(myIsClickedAtOperationBar!==isClickedAtOperationBar){
            updateIsClickedAtOperationBar(myIsClickedAtOperationBar);
        }
    }, [myIsClickedAtOperationBar]);

    function sendCurRowAndColSplitCountInfo(){
        updateCurCellSplitInfo(myRowCount,myColCount);
    }
    function sendMergeRowOrColumn(){
        doMergeCells(myRowCount,myColCount);
    }
    function deleteLocateRow(){
        doDeleteRow();
    }
    function deleteLocateCol(){
        doDeleteCol();
    }

    function updateMyRowCount(e){
        setMyRowCount(e);
    }

    function updateMyColCount(e){
        setMyColCount(e);
    }

    return (
        <div className={styles["cell-operation-bar"]} style={positionVal} onClick={()=>{setMyIsClickedAtOperationBar(true)}}>
        <div className={styles["merge-cell"]}>
        <Button size="small" onClick={sendMergeRowOrColumn}>合并单元格</Button>
</div>
    <div className={styles["split-cell"]}>
        <Button size="small" onClick={()=>setIsShowPop((state)=>!state)}>拆分单元格</Button>
        {
            isShowPop&&(
                <div className={styles["popover-split-box"]}>
                    <div className={styles["count"]}>
                        <span>行数：</span>
                        <InputNumber size="small" value={myRowCount} onChange={(e)=>updateMyRowCount(e)}/>
                    </div>
                    <div className={styles["count"]}>
                        <span>列数：</span>
                        <InputNumber size="small" value={myColCount} onChange={(e)=>updateMyColCount(e)}/>
                    </div>
                    <Button size="small" onClick={sendCurRowAndColSplitCountInfo}>确认</Button>
            </div>
            )
        }
        </div>
            <div className={styles["delete-row"]}>
                <Button size="small" onClick={deleteLocateRow}>删除所在行</Button>
            </div>
            <div className={styles["delete-col"]}>
                <Button size="small" onClick={deleteLocateCol}>删除所在列</Button>
            </div>
        </div>
    )
}