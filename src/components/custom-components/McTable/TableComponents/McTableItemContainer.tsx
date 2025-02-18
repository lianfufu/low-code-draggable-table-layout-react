import React from "react";


export default function McTableItemContainer({padding=0,contentBgc="#e6e6e6",children=""}:{padding?:number,contentBgc?:string,children?:React.ReactNode}){
    return (
        <div>
            <div style={{paddingBottom:padding+'px',paddingTop:padding+'px'}}>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}