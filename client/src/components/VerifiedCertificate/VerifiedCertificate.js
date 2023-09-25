import html2canvas from "html2canvas";
import styles from "./VerifiedCertificate.module.css";
import GreenTick from "../../assets/greenTick";
import { useEffect, useState } from "react";

const VerifiedCertificate = (props) => {
  useEffect(() => {
    props.setModal("");
  }, []);
  const downloadCertificate = async () => {
    const element = document.getElementById("verified-certificate");
    element.style.scale = 3;
    element.style.backgroundImage = `url("https://rose-melodic-felidae-510.mypinata.cloud/ipfs/${props.cid}")`;
    const body = document.getElementsByTagName("body")[0];
    body.onload = async () => {
      const canvas = await html2canvas(element),
        data = canvas.toDataURL("image/jpg");
      element.style.scale = 1;
      const link = document.createElement("a");
      link.download = "certificate.jpg";
      link.href = data;
      link.click();
    };
  };
  const shareCertificate = async () => {
    const link = document.createElement("a");
    link.href = `mailto:?subject=${props.message}&body='download and attach certificate'"`;
    link.click();
  };
  return (
    <div className={styles.container}>
      <div
        className={styles.certificate}
        id="verified-certificate"
        style={{
          backgroundImage: `url("https://rose-melodic-felidae-510.mypinata.cloud/ipfs/${props.cid}")`,
        }}
      >
        <img className={styles.qr} src={props.qr} alt="" />
      </div>
      <div className={styles.issueData}>
        <img className={styles.qrData} src={props.qr} alt="" />
        <div>Certificate ID: {props._id} </div>
        <GreenTick />
        <div>Issued on: {props.timestamp} </div>
      </div>
      <div className={styles.action}>
        <button className={styles.actionBtn} type="button">
          Download
        </button>
        <button className={styles.actionBtn} type="button">
          Share
        </button>
      </div>
    </div>
  );
};

export default VerifiedCertificate;
