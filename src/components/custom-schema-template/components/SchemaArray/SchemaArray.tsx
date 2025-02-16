import {
    baseSchemaPropsType,
    useMyBasicValue
} from "@/components/custom-schema-template/components/SchemaString/SchemaString.tsx";
import {useCallback, useState} from "react";
import {produce} from "immer";
import {getRandomCode} from "@/utils/globalMethods.ts";
import HeaderWrapper from "@/components/custom-schema-template/HeaderWrapper.tsx";
import styles from "./SchemaArray.module.scss";
import SchemaComponent from "@/components/custom-schema-template/components/SchemaComponent.tsx";
import {useDispatch} from "react-redux";
import {updateCurComponent} from "@/store/mainReducer.ts";

export default function SchemaArray(props:baseSchemaPropsType&{child:object}&{value:any[]}& { parentKeysStr:string }) {
    const {id,label,child={},parentKeysStr,...myBasicProps}=props;
    let {myValue,setMyValue,myOptions}=useMyBasicValue(myBasicProps);

    const [defaultData,setDefaultData]=useState({
        id: "0001",
        label: "新增内容",
        image:""
    });
    function deleteCurData(item:any){
        const matchedIndex=myValue.indexOf(item);
        if(matchedIndex===-1){
            console.warn("删除失败！");
            return;
        }
        const newMyValue=produce(myValue,(draft)=>{
            draft.splice(matchedIndex,1);
        });
        setMyValue(newMyValue);
    }

    function addData(){
        const newMyValue=produce(myValue,(draft)=>{
            draft.push({
                ...defaultData,
                id:getRandomCode(8)
            });
        });
        // setMyValue(newMyValue);
        console.log(parentKeysStr+" "+(newMyValue.length-1),"parentKeysStr+\" \"+newMyValue.length-1,newMyValue");
        handleUpdateValue(parentKeysStr+" "+(newMyValue.length-1),{
            ...defaultData,
            id:getRandomCode(8)
        });
    }

    const dispatch=useDispatch();
    const handleUpdateValue=useCallback((curKey:string,value:any)=>{
        // console.log(value,oldValue,"value,oldeValue");
        // oldValue=value;
        console.log("array内执行更新curComponent",curKey);
        dispatch(updateCurComponent({fullPathKey:curKey, value}));
    },[]);

    const entries=Object.entries(child);
    return (
        <HeaderWrapper label={label}>
            <div className={styles["array-body"]}>
                {
                    myValue.map((item,index)=>(
                        <ul key={index} style={{margin: "10px"}}>
                            <li className={styles["data-item"]}>
                                {
                                    entries.map((entry,index2)=>(
                                        <SchemaComponent key={index2} parentKeysStr={parentKeysStr+" "+index} is={entry[1].type} {...entry[1]} value={item[entry[0]]} updateValue={(value:any)=>handleUpdateValue(parentKeysStr+" "+index+" "+entry[0],value)}>

                                        </SchemaComponent>
                                        // <div key={index}>
                                        //     {parentKeysStr}-{entry[0]}-{JSON.stringify(entry[1])}
                                        // </div>
                                    ))
                                }
                            {/*    <component v-for="(curField,key,index) in child" key="index" :is="getComponentName(curField.type)" v-model="item[key]">*/}

                            {/*</component>*/}
                            <span onClick={()=>deleteCurData(item)} className={styles["close-icon"]}>×</span>
                        </li>
                    </ul>
                    ))
                }
                <div className={styles["add-button"]} onClick={addData}>
                    增加数据
                </div>
            </div>
        </HeaderWrapper>
    )
}