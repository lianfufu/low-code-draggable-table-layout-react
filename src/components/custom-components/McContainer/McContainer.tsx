import styles from "./McContainer.module.scss"
import React, {useMemo} from "react";

export default function McContainer({padding=100,title="容器标头",headBgc="#DD6161",minHeight=50,contentBgc="#e6e6e6",children="",opacity=1}){
    const getCoreContentStyle={
        minHeight: minHeight+'px',
        backgroundColor: contentBgc,
    }
    return (
        <div className={styles.cnt} style={{opacity}}>
            <div className={styles["cnt-header"]} style={{backgroundColor: headBgc}}>
                {title}
            </div>
            <div className={styles.container} style={{paddingBottom: padding + 'px', paddingTop: padding + 'px'}}>
                <div style={getCoreContentStyle}>
                    {children}
                </div>
            </div>
        </div>
    )
}

