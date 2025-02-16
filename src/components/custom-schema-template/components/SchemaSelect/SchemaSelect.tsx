import { DownOutlined } from '@ant-design/icons';
import {
    baseSchemaPropsType,
    useMyBasicValue
} from "@/components/custom-schema-template/components/SchemaString/SchemaString.tsx";
import styles from "./SchemaSelect.module.scss";
import LabelWrapper from "@/components/custom-schema-template/LabelWrapper.tsx";
import React, {useCallback, useMemo, useState} from "react";
import {Button} from "antd";

export default function SchemaSelect(props:baseSchemaPropsType&{data:any[]}&{value:string}) {
    const {id,label,data=[],...myBasicProps}=props;

    let {myValue,setMyValue,myOptions}=useMyBasicValue(myBasicProps);

    const isNeedOnSameRow=!(data && data.length > 3);//其实计算1次即可，但没必要因小失大，计算不耗时
    const showValue=useMemo(()=>{
        console.log(data,myValue,"data myValue");
        if(!data){
            return "居左";
        }else{
            const matched = data.filter(item=>item.value===myValue);
            if(matched&&matched.length===1){
                return matched[0].label;
            }else{
                return "未匹配值";
            }
        }
    },[myValue]);

    const changeMyValue =useCallback(function (val){
        console.log(val,"为什么居左未渲染？",myValue);
        if(val!==myValue){
            setMyValue(val);
        }
    },[setMyValue,myValue]);

    // // 正确写法：函数式更新确保最新状态
    // const changeMyValue = (val) => {
    //     setMyValue(prev => val !== prev ? val : prev);
    // };

    return (
        <div className={`${styles["schema-select"]} ${isNeedOnSameRow?styles["flex-same-row"]:styles["flex-different-row"]}`}>
            <div className={styles["label-area"]} style={{marginBottom: isNeedOnSameRow ? '0' : '15px'}}>
                <span className={"w70 f13 f-grey"}>
                    {label}
                </span>
                <span className={"f14"}>
                    {showValue}
                </span>
            </div>
            <div className={styles["select-area"]}>
                {
                    data.map((item)=>(
                        <Button size={"small"} key={item.value}
                                onClick={()=>changeMyValue(item.value)}
                                className={`mode-select-item flex-center ${item.value===myValue?'select-item-active':''}`}
                        >
                            {item.label}
                        </Button>
                    ))
                }
            </div>
        </div>
    )
}