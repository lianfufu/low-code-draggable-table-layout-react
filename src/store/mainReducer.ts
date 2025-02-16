import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from '../store';
import {values} from "lodash";

//component为string也可以做进一步的限制
export type CurComponentType={[index: string]: unknown}&{ component:string }

type MainStateType={
    initializing:object[]|null,
    fields:object|null,//全部左侧的定义的各个类型的fields
    curComponent: CurComponentType|null,
    curFields: object|null // 初始化为 null 或你想要的任何默认值
    lastDeletedComponentId:string,
}

const initialMainState:MainStateType={
    initializing:null,
    fields:null,//全部左侧的定义的各个类型的fields
    curComponent: null,
    curFields: null,// 初始化为 null 或你想要的任何默认值
    lastDeletedComponentId:""
}

const mainSlice = createSlice({
    name: 'main',
    initialState: initialMainState,
    reducers: {
        setInitializing(state, action: PayloadAction<object[]|null>){
            state.initializing = action.payload;
        },
        setCurComponent(state, action: PayloadAction<CurComponentType|null>){
            state.curComponent = action.payload;
        },
        updateCurComponent(state,action:PayloadAction<{fullPathKey:string,value:any}>){
            console.log(action.payload.fullPathKey,action.payload.value);
            const pathKeyArr=action.payload.fullPathKey.split(" ");
            let curLevelStateValue=state.curComponent;
            console.log(curLevelStateValue,pathKeyArr,"updateCurComponent");
            for(let i=0;i<pathKeyArr.length;i++){
                const curKey=pathKeyArr[i];
                if(!curKey){
                    continue;
                }
                if(i<pathKeyArr.length-1){
                    curLevelStateValue=curLevelStateValue[curKey];
                    if(curLevelStateValue===undefined&&Number.isInteger(Number(curKey))){
                        console.log(curKey,`fullKey:${action.payload.fullPathKey}`,action.payload.value);
                        curLevelStateValue[curKey]=action.payload.value;
                        return;
                    }
                    continue;
                }

                // if(curLevelStateValue===undefined&&Number.isInteger(Number(curKey))){
                //
                // }
                curLevelStateValue[curKey]=action.payload.value;
            }
            console.log(state.curComponent.title,"curlevelStateValue");
        },
        setFields(state, action: PayloadAction<object|null>){
            state.fields = action.payload;
        },
        setCurFields(state, action: PayloadAction<object|null>){
            state.curFields = action.payload;
        },
        setLastDeletedComponentId(state, action: PayloadAction<string>){
            state.lastDeletedComponentId = action.payload;
        },
    }
})

export const { setInitializing,setCurComponent,setLastDeletedComponentId,updateCurComponent, setFields, setCurFields } = mainSlice.actions;

export const selectCurFields = (state: RootState) => {
    console.log("更新curComponent会重新执行计算curFields",state.main.curComponent?.component);
    if(state.main.curComponent?.component==="McImg"||
        state.main.curComponent?.component==="McTab"||
        state.main.curComponent?.component==="McTable"||
        state.main.curComponent?.component==="McTitle"||
        state.main.curComponent?.component==="McContainer"){
        if(state.main.curComponent?.component&&state.main.fields![state.main.curComponent.component]){
            console.log("更新curComponent会重新执行计算curFields2",state.main.fields![state.main.curComponent.component]);
            return state.main.fields![state.main.curComponent.component];
        }
    }else{
        return state.main.curFields;
    }
};

export default mainSlice.reducer;