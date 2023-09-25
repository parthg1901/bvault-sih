import styles from "./Modal.module.css";
import loadingGif from "../../assets/loadingGif.gif";

const Modal = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div>
          <img src={loadingGif} className={styles.loading}/>
        </div>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default Modal;
