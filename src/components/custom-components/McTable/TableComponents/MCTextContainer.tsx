

type McTextContainerPropsType={
    containerHeight?:number,
    contentBgc?:string
}

export default function McTextContainer({containerHeight=30,contentBgc="#fff"}:McTextContainerPropsType){
    const getCoreContentStyle={
        minHeight: containerHeight+'px',
        backgroundColor: contentBgc,
    }
    return (
        <div style={{height:containerHeight+'px'}}>

        </div>
    )
}