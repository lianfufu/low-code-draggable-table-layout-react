import React from "react";


export default function LabelWrapper({label="无标签",children}:{children:React.ReactNode,label?:string}){

    return (
        <div className="p10" style={{display:"flex",alignItems:"center"}}>
            <div className="w80 f13 f-grey">{label}</div>
            {children}
        </div>
    )
}