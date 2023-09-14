import styles from "./Modal.module.css"

const Modal = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <p>{props.type}</p>
                <p>{props.description}</p>
            </div>
        </div>
    )
}