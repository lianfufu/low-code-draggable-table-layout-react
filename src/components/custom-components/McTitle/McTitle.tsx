import Sortable from "@/components/dnd-components/Sortable.tsx";
import {useMemo} from "react";

type McTitlePropsType={
    title?:string,
    model?:string,
    styles?:{
        titleColor:string,
        titleSize:string,
    },
}
export default function McTitle({title="默认文本",model="默认文本",styles={}}:McTitlePropsType) {
    const id=useMemo(()=>Date.now()+Math.floor(Math.random() * 1000)+'',[]);
    const titleStyles=useMemo(()=>{
        if(!styles||JSON.stringify(styles)==="{}"){
            return {
                fontSize:"20px",
                color:"black",
                textAlign:"left"
            }
        }else{
            return{
                fontSize:styles.titleSize+"px",
                color:styles.titleColor!,
                textAlign:model!,
            }
        }
        return {}
    },[title,model,styles]);//传递给自定义组件的对象要memo化处理，以防止重复渲染子组件
    return (
          <Sortable id={id}>
            <div style={{padding:"0 10px"}} className={"ellipsis-1"}>
                <div style={{...titleStyles}}>{title}</div>
            </div>
          </Sortable>
      )
}