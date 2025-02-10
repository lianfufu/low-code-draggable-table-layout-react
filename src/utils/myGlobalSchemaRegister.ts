// import { useDispatch } from 'react-redux';
import {setFields, setInitializing} from "@/store/mainReducer.ts";

export function initCustomComponentsConfig(dispatch) {
    const modules = import.meta.glob(
        '@/components/custom-components/**/component.json',
        { eager: true, import: 'default' } // 直接导入 JSON 内容
    );
    console.log("useInitCustomComponentsConfig",modules);
    // 遍历模块并全局注册组件
    // 遍历匹配的模块
    const fields: { [key: string]: any } = {};
    const initializing=[] as any[];
    Object.entries(modules).forEach(([key, data]) => {
        // 从路径中提取组件名称（例如 "McTitle"）
        const pathSegments = key.split('/');
        const componentName = pathSegments[pathSegments.length - 2]; // 获取父级目录名
        const originData={
            component: componentName,
            ...data // 直接使用解析后的 JSON 对象
        };
        fields[componentName] = originData.fields;
        initializing.push(getSchemaDefaultValue(originData));
    });
    console.log(fields);
    dispatch(setFields(fields));
    dispatch(setInitializing(initializing));
}

function getSchemaDefaultValue(inputVal:any){
    const res={} as {[index:string]:any};
    for (const inputValKey in inputVal) {
        if(inputValKey==="children"||typeof inputVal[inputValKey] !== 'object'){
            res[inputValKey] = inputVal[inputValKey];
            continue;
        }
        //注意如何处理children
        recurseGetDeepValue(res,inputVal[inputValKey]);
    }
    return res;
}

function recurseGetDeepValue(res:any,inputVal:any){
    for (const inputValKey in inputVal){
        if(inputVal[inputValKey].type !== 'object'){
            res[inputValKey] = inputVal[inputValKey].value;
        }else{
            res[inputValKey]={};
            recurseGetDeepValue(res[inputValKey],inputVal[inputValKey].child);
        }
    }
}