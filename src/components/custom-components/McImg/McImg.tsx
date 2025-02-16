

type McImgPropsType={
    opacity?:number,
    imagePath?:string,
    radius?:number
}

export default  function McImg({opacity=1,radius=0,imagePath="https://img01.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png!large.webp"}:McImgPropsType){

    const computedImgUrl=imagePath?imagePath:"https://img01.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png!large.webp";
    return (
        <div style={{width:"100%"}}>
            <img src={computedImgUrl} alt="占位图片" style={{borderRadius:radius+'px',overflow:"hidden",width:"100%"}}/>
        </div>
    )
}