import {memo, useCallback} from "react";
import SchemaComponent from "@/components/custom-schema-template/components/SchemaComponent.tsx";


function CustomSchemaTemplate({component,curFields={}}:{component:object,curFields?:object}){
    const entries=Object.entries(curFields);
    console.log("右侧CustomSchemaTemplate执行了重新渲染",curFields,entries);

    const handleUpdateValue=useCallback((value:any,oldValue)=>{
        oldValue=value;
    },[]);

    return (
        <ul>
            {
                entries.map((entry,index)=>(
                    <li key={index}>
                        <SchemaComponent is={entry[1].type} {...entry[1]} value={component[entry[0]]} updateValue={(value:any)=>handleUpdateValue(value,component[entry[0]])}/>
                        {
                            entry[1].child&&(
                                <CustomSchemaTemplate component={component[entry[0]]} curFields={entry[1].child}/>
                            )
                        }
                    </li>
                ))
            }
        </ul>
    )
}
export default memo(CustomSchemaTemplate);