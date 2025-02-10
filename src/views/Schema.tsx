import { useSelector, useDispatch } from 'react-redux';
import {RootState} from "@/store"
import {setFields, setCurFields, setCurComponent, selectCurFields} from "@/store/mainReducer.ts";

export default function Schema(){
    const fields=useSelector((state:RootState)=>state.main.fields);
    const curFields=useSelector((state:RootState)=>state.main.curFields);
    const curComponent=useSelector((state:RootState)=>state.main.curComponent);
    const selectCurField=useSelector((state:RootState)=>selectCurFields(state));

    const dispatch=useDispatch();
    // useEffect(() => {
    //     dispatch(setFields({McTitle:"title666",McTable:"container666"}))
    // }, [dispatch]);

    return (
        <>
            <div>
                fields:{fields&&JSON.stringify(fields)}
            </div>
            <button onClick={()=>dispatch(setFields({McTitle:"title888",McTable:"container888"}))}>setFields</button>
            <div>
                curFields:{curFields&&JSON.stringify(curFields)}
            </div>
            <button onClick={()=>dispatch(setCurFields({MyDef:"自定义内容"}))}>setCurFields</button>
            <div>
                curComponent:{curComponent&&JSON.stringify(curComponent)}
            </div>
            <button onClick={()=>dispatch(setCurComponent({component:"McTable"}))}>setCurComponent</button>
            <div>
                selectCurField:{selectCurField&&JSON.stringify(selectCurField)}
            </div>
            <div>Home</div>
        </>
    )
}