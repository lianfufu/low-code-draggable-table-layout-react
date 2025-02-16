import React from "react";
import SchemaString from "@/components/custom-schema-template/components/SchemaString/SchemaString.tsx";
import SchemaObject from "@/components/custom-schema-template/components/SchemaObject/SchemaObject.tsx";
import SchemaSelect from "@/components/custom-schema-template/components/SchemaSelect/SchemaSelect.tsx";
import SchemaNumber from "@/components/custom-schema-template/components/SchemaNumber/SchemaNumber.tsx";
import SchemaArray from "@/components/custom-schema-template/components/SchemaArray/SchemaArray.tsx";
import SchemaSwitch from "@/components/custom-schema-template/components/SchemaSwitch/SchemaSwitch.tsx";
import SchemaUpload from "@/components/custom-schema-template/components/SchemaUpload/SchemaUpload.tsx";
import SchemaColor from "@/components/custom-schema-template/components/SchemaColor/SchemaColor.tsx";
import SchemaJump from "@/components/custom-schema-template/components/SchemaJump/SchemaJump.tsx";

const SchemaComponents={
    SchemaString,
    SchemaObject,
    SchemaSelect,
    SchemaNumber,
    SchemaArray,
    SchemaSwitch,
    SchemaUpload,
    SchemaColor,
    SchemaJump
}

type SchemaComponentPropsType= {
    is:string,
    children?:React.ReactNode,
    parentKeysStr?:string,
    [index:string]:unknown,
}
export default function SchemaComponent({is,children="",parentKeysStr="",...otherProps}:SchemaComponentPropsType){
    console.log("渲染的is组件可能会出现为undefined的情况？",is);
    const firstLetter=is[0].toUpperCase();
    const componentName="Schema"+firstLetter+is.substring(1).toLowerCase();
    const Component = SchemaComponents[componentName];
    // console.log("COmponent出现了null?",Component,componentName);
    return (
        <Component {...otherProps} parentKeysStr={parentKeysStr}>
            {children}
        </Component>
    )
}