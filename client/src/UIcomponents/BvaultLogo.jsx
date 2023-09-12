import React from "react";
import styles from "./bvaultLogo.module.css";
import SvgComponent from "../assests/LogoSvg";

const BvaultLogo = (props) => {
  return (
    <>
      <div className={styles.logo}>
        <SvgComponent className={styles.svg} />
        {props.children}
      </div>
    </>
  );
};

export default BvaultLogo;
