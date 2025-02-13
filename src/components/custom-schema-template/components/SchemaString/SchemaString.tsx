import React, {useCallback, useEffect, useState} from "react";
import isEqual from "lodash/isEqual";
import {Input} from "antd";
import LabelWrapper from "@/components/custom-schema-template/LabelWrapper.tsx";


export type baseSchemaPropsType={
    id:string,
    label:string,
    options:object,
    updateValue:(val:any)=>void
}
// const defaultSchemaPropsVal={
//     id
// }

//这里value好像不方便设置默认值
export function useMyBasicValue({value,options,updateValue}){

    const [myValue,setMyValue]=useState(value);
    const myOptions={...options};//todo 这里用不用useMemo处理，这里用不用深拷贝？
    console.log("有重新执行了useMyBasicValue钩子了",myValue);
    useEffect(() => {
        if (!isEqual(value, myValue)) {
            setMyValue(value);
        }
    }, [value]);//todo 如何实现了隐式的基于deep的深拷贝处理，执行setMyValue(modelValue)时，modelValue是否需要制造出一个新的对象
    useEffect(() => {
        // console.log("是否触发执行!isEqual(value, myValue)",!isEqual(value, myValue),value,myValue);
        // if (!isEqual(value, myValue)) {
        //     updateValue(myValue);
        // }
        updateValue(myValue);
    }, [myValue]);//todo 如何实现了隐式的基于deep的深拷贝处理，执行setMyValue(modelValue)时，modelValue是否需要制造出一个新的对象

    const inputOnChange=useCallback((e: any)=>{
        const newValue=e.target?.value;
        console.log(newValue,myValue,"newValue");
        if (newValue !== myValue) {
            setMyValue(newValue);
        }
    },[setMyValue,myValue]);

    return {
        myValue,
        setMyValue,
        myOptions,
        inputOnChange
    }
}

export default function SchemaString(props:baseSchemaPropsType&{value:string}) {
    const {id,label,...myBasicProps}=props;
    // const [myValue,setMyValue]=useState(value);
    // const myOptions={...options};//todo 这里用不用useMemo处理，这里用不用深拷贝？
    //
    // useEffect(() => {
    //     if (!isEqual(value, myValue)) {
    //         setMyValue(value);
    //     }
    // }, [value]);//todo 如何实现了隐式的基于deep的深拷贝处理，执行setMyValue(modelValue)时，modelValue是否需要制造出一个新的对象
    // useEffect(() => {
    //     if (!isEqual(value, myValue)) {
    //         updateValue(myValue);
    //     }
    // }, [myValue]);//todo 如何实现了隐式的基于deep的深拷贝处理，执行setMyValue(modelValue)时，modelValue是否需要制造出一个新的对象
    //
    // const inputOnChange=useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
    //     const newValue=e.target.value;
    //     console.log(newValue,"newValue");
    //     if (newValue !== myValue) {
    //         setMyValue(newValue);
    //     }
    // },[setMyValue]);

    const {myValue,inputOnChange}=useMyBasicValue(myBasicProps);
    return (
        <LabelWrapper label={label}>
            <Input size={"small"} value={myValue} onChange={inputOnChange}/>
        </LabelWrapper>
    );
}