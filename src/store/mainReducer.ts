import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from '../store';

//component为string也可以做进一步的限制
export type CurComponentType={[index: string]: unknown}&{ component:string }

type MainStateType={
    initializing:object[]|null,
    fields:object|null,//全部左侧的定义的各个类型的fields
    curComponent: CurComponentType|null,
    curFields: object|null // 初始化为 null 或你想要的任何默认值
}

const initialMainState:MainStateType={
    initializing:null,
    fields:null,//全部左侧的定义的各个类型的fields
    curComponent: null,
    curFields: null // 初始化为 null 或你想要的任何默认值
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
        setFields(state, action: PayloadAction<object|null>){
            state.fields = action.payload;
        },
        setCurFields(state, action: PayloadAction<object|null>){
            state.curFields = action.payload;
        },
    }
})

export const { setInitializing,setCurComponent, setFields, setCurFields } = mainSlice.actions;

export const selectCurFields = (state: RootState) => {
    if(state.main.curComponent?.component==="McImg"||
        state.main.curComponent?.component==="McTab"||
        state.main.curComponent?.component==="McTable"||
        state.main.curComponent?.component==="McTitle"){
        if(state.main.curComponent?.component&&state.main.fields![state.main.curComponent.component]){
            return state.main.fields![state.main.curComponent.component];
        }
    }else{
        return state.main.curFields;
    }
};

export default mainSlice.reducer;