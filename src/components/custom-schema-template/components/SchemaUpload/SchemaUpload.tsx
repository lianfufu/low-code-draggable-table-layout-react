import {
    baseSchemaPropsType,
    useMyBasicValue
} from "@/components/custom-schema-template/components/SchemaString/SchemaString.tsx";
import LabelWrapper from "@/components/custom-schema-template/LabelWrapper.tsx";
import {Upload, UploadFile, UploadProps} from "antd";
import {useState} from "react";


export default function SchemaUpload(props:baseSchemaPropsType&{value:string}) {
    const {id,label,...myBasicProps}=props;
    myBasicProps.value=myBasicProps.value||"";//此处设置默认值

    let {myValue,setMyValue,myOptions}=useMyBasicValue(myBasicProps);

    const uploadUrl=import.meta.env.VITE_APP_BASE_API + 'api/v1/user/onload/files';

    let initialPic=[];
    if(myValue){
        initialPic=[{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: myValue,
        }];
    }

    const [fileList, setFileList] = useState<UploadFile[]>(initialPic);

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList,...otherProps }) => {

        if(newFileList && newFileList.length>0){
            setFileList(newFileList);
            setMyValue(otherProps.file.response);
        }
    };

    return (
        <LabelWrapper label={label}>
            <Upload
                action={uploadUrl}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
            >
                {fileList.length < 1 && '+ Upload'}
            </Upload>
        </LabelWrapper>
    )
}