import {
    baseSchemaPropsType,
    useMyBasicValue
} from "@/components/custom-schema-template/components/SchemaString/SchemaString.tsx";
import {Col, InputNumber, Row, Slider} from "antd";
import LabelWrapper from "@/components/custom-schema-template/LabelWrapper.tsx";
import React from "react";

export default function SchemaNumber(props:baseSchemaPropsType&{value:number}) {
    const {id,label,...myBasicProps}=props;
    const {myValue,setMyValue,myOptions}=useMyBasicValue(myBasicProps);

    //重写useMyBasicValue的change handler
    const onChange = (newValue:any) => {
        setMyValue(newValue);
    };

    return (
        <LabelWrapper label={label}>
            {/*<Slider*/}
            {/*    style={{flex:1}}*/}
            {/*    {...myOptions}*/}
            {/*    onChange={inputOnChange}*/}
            {/*    value={typeof myValue === 'number' ? myValue : 0}*/}
            {/*/>*/}
            <Row style={{flex:1,paddingRight:"15px"}}>
                <Col span={20}>
                    <Slider
                        {...myOptions}
                        onChange={onChange}
                        value={typeof myValue === 'number' ? myValue : 0}
                    />
                </Col>
                <Col span={4}>
                    <InputNumber
                        width={'12px'}
                        size={"small"}
                        {...myOptions}
                        style={{
                            margin: '0 16px',
                        }}
                        value={myValue}
                        onChange={onChange}
                    />
                </Col>
            </Row>
        </LabelWrapper>
    )
}