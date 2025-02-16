import React from "react";
import HeaderWrapper from "@/components/custom-schema-template/HeaderWrapper.tsx";

export default function SchemaObject({label="默认头内容",children=""}:{label?:string,children?:React.ReactNode}) {
    return (
        <HeaderWrapper label={label}>
            {children}
        </HeaderWrapper>
    )
}