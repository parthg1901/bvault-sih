import styles from "./Certificate.module.css"

const Certificate = (props) => {
    return (
        <div className={styles.container} style={{backgroundImage: `url("${props.templateURL}")`}}>
            <div className={styles.header}>
                <div className={styles.logo} style={{backgroundImage: `url("${props.logo}")`}} >
                </div>
                <p className={styles.title}>{props.title}</p>
            </div>
            <div className={styles.main}>
                <p className={styles.name}>{props.name}</p>
                <p className={styles.description}>{props.description}</p>
            </div>
            <div className={styles.footer}>
                <div className={styles.left}>
                    <img className={styles.qr} src={props.qr}/>
                </div>
                <div className={styles.right}>
                    <img className={styles.signature} src={props.signature}/>
                    <div className={styles.signerDetails}>
                        <div className={styles.signatory}>{props.signerDetails.name}</div>
                        <div className={styles.designation}>{props.signerDetails.designation}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Certificate;