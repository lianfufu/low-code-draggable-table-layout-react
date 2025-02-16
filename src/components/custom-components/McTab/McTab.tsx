
import tabStyles from "./McTab.module.scss";
type McTabPropsType={
    opacity?:number,
    tabList?:any[],
    attrs?:{
        type:string,
        [index:string]:unknown,
    },
    styles?:{
        max:number,
        fontSize:number,
        titleColor:string,
        cmpBackground:string,
        imgRadius:number,
        imgPadding:number,
        imgWidth:number,
        cmpUpperPadding:number,
        cmpLowerPadding:number,
        [index:string]:unknown,
    },
}
export default function McTab({opacity=1,tabList=[],attrs={},styles={}}:McTabPropsType){
    console.log("再次选然后的attrs和styles",attrs,styles,tabList);
    const tabItemWidth=`${430/attrs!.max}px`;
    const width=tabList!.length*430/attrs!.max;
    const tabWidth=`${width<=430?430:width}px`;
    const bodyStyle={
        color:styles!.titleColor?styles!.titleColor:"#000000",
        backgroundColor:styles!.cmpBackground?styles!.cmpBackground:"#ffffff",
        fontSize:styles!.fontSize+'px',
    }
    const imgStyle={
        width:`${styles!.imgWidth}%`,
        padding:styles!.imgPadding+"px",
        borderRadius:styles!.imgRadius+"px",
        marginTop:styles!.cmpUpperPadding+"px",
    }

    const textStyle={
        marginBottom:styles!.cmpLowerPadding+"px",
    }

    return (
        <div className={tabStyles.wrap}>
            <div className={tabStyles["wrap-body"]} style={bodyStyle}>
                <ul className={tabStyles.tabs} style={{width:tabWidth}}>
                    {
                        tabList?.map((item,index)=>(
                            <li key={index} className={tabStyles["tab-item"]} style={{width:tabItemWidth}}>
                                {(attrs!.type==='image-text'||attrs!.type==='image')&&<img className={tabStyles["tab-item-img"]} style={imgStyle}
                                      src={item.image?item.image:'http://127.0.0.1:3000/defaultabimg.jpg'}
                                      alt="BannersImg"/>}
                                {(attrs!.type==='image-text'||attrs!.type==='text')&&<span style={textStyle} className="ellipsis-1">{item.label}</span>}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}