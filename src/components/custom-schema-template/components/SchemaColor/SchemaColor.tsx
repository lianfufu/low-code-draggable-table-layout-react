import { DownOutlined } from '@ant-design/icons';
import {
    baseSchemaPropsType,
    useMyBasicValue
} from "@/components/custom-schema-template/components/SchemaString/SchemaString.tsx";
import {ColorPicker} from "antd";
import LabelWrapper from "@/components/custom-schema-template/LabelWrapper.tsx";
import React, {useState} from "react";

export default function SchemaColor(props:baseSchemaPropsType&{value:number}) {
    const {id,label,...myBasicProps}=props;
    const {myValue,setMyValue,myOptions}=useMyBasicValue(myBasicProps);

    //重写useMyBasicValue的change handler
    const onChange = (newValue:any) => {
        console.log(newValue,newValue.toHex(),"newValue")
        if(myValue.toLowerCase()!=="#"+newValue.toHex()){
            setMyValue("#"+newValue.toHex());
        }
    };
    const [open,setOpen]=useState(false);
    return (
        <LabelWrapper label={label}>
            <div style={{flex:1}}>
                <div
                    className={"flex row-right"}
                    style={{width: "calc(100% - 24px)"}}
                >
                    <ColorPicker
                        size={"small"}
                        value={myValue}
                        onChange={onChange}
                        open={open}
                        onOpenChange={setOpen}
                        showText={() => (
                            <DownOutlined
                                rotate={open ? 180 : 0}
                                style={{
                                    color: 'rgba(0, 0, 0, 0.25)',
                                }}
                            />
                        )}
                    />
                </div>
            </div>
        </LabelWrapper>
    )
}