import PageHeader from "@/components/home-components/PageHeader.tsx";
import PageBody from "@/components/home-components/PageBody.tsx";
import styles from "./Home.module.scss"

export default function Home(){
    return (<div className={styles.main}>
        <PageHeader/>
        <PageBody/>
    </div>)
}