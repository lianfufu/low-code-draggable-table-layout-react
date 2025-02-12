import React from "react";
import SchemaString from "@/components/custom-schema-template/components/SchemaString/SchemaString.tsx";
import SchemaObject from "@/components/custom-schema-template/components/SchemaObject/SchemaObject.tsx";
import SchemaSelect from "@/components/custom-schema-template/components/SchemaSelect/SchemaSelect.tsx";
import SchemaNumber from "@/components/custom-schema-template/components/SchemaNumber/SchemaNumber.tsx";
import SchemaArray from "@/components/custom-schema-template/components/SchemaArray/SchemaArray.tsx";
import SchemaSwitch from "@/components/custom-schema-template/components/SchemaSwitch/SchemaSwitch.tsx";
import SchemaUpload from "@/components/custom-schema-template/components/SchemaUpload/SchemaUpload.tsx";
import SchemaColor from "@/components/custom-schema-template/components/SchemaColor/SchemaColor.tsx";

const SchemaComponents={
    SchemaString,
    SchemaObject,
    SchemaSelect,
    SchemaNumber,
    SchemaArray,
    SchemaSwitch,
    SchemaUpload,
    SchemaColor
}

type SchemaComponentPropsType= {
    is:string,
    children?:React.ReactNode,
    [index:string]:unknown,
}
export default function SchemaComponent({is,children="",...otherProps}:SchemaComponentPropsType){
    const firstLetter=is[0].toUpperCase();
    const componentName="Schema"+firstLetter+is.substring(1).toLowerCase();
    const Component = SchemaComponents[componentName];
    // console.log("COmponent出现了null?",Component,componentName);
    return (
        <Component {...otherProps}>
            {children}
        </Component>
    )
}