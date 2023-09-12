import React from "react";
import styles from "./scanComponent.module.css";
import ScanSvg from "../assests/ScanSvg";

const ScanComponent = (props) => {
  return (
    <><div className={styles.container}>
      <button onClick={props.onClick} className={styles.logo}>
        <ScanSvg className={styles.svg} />
        {props.children};
      </button>
      </div>
    </>
  );
};

export default ScanComponent;