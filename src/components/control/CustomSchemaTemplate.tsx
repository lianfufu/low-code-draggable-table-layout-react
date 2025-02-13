import {memo, useCallback} from "react";
import SchemaComponent from "@/components/custom-schema-template/components/SchemaComponent.tsx";
import {updateCurComponent} from "@/store/mainReducer.ts";
import {useDispatch} from "react-redux";


function CustomSchemaTemplate({component,curFields={},parentKeysStr=""}:{component:object,curFields?:object,parentKeysStr?:string}){
    const entries=Object.entries(curFields);
    console.log("右侧CustomSchemaTemplate执行了重新渲染",curFields,entries);
    const dispatch=useDispatch();
    const handleUpdateValue=useCallback((curKey:string,value:any)=>{
        // console.log(value,oldValue,"value,oldeValue");
        // oldValue=value;
        dispatch(updateCurComponent({fullPathKey:parentKeysStr+" " + curKey, value}));
    },[]);



    return (
        <ul>
            {
                entries.map((entry,index)=>(
                    <li key={index}>
                        <SchemaComponent is={entry[1].type} {...entry[1]} value={component[entry[0]]} updateValue={(value:any)=>handleUpdateValue(entry[0],value)}>
                            {
                                entry[1].child&&(
                                    <CustomSchemaTemplate component={component[entry[0]]} parentKeysStr={parentKeysStr+" "+entry[0]} curFields={entry[1].child}/>
                                )
                            }
                        </SchemaComponent>
                    </li>
                ))
            }
        </ul>
    )
}
export default memo(CustomSchemaTemplate);