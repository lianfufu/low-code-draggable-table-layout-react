import styles from "./HeaderWrapper.module.scss"
import React from "react";
export default function HeaderWrapper({label="无标签",children=""}:{label?:string,children?:React.ReactNode}){
  return (
      <div className={styles["header-wrapper"]}>
        <div className={styles["header-container"]}>
          <div className={styles["header-label"]}>{label}</div>
        </div>
        {children}
      </div>
  )
}
