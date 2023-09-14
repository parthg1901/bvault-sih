import styles from "./Certificate.module.css"
import { toPng } from 'html-to-image';
import { useRef } from "react";
import { getBase64 } from "../../utils/utils";

const Certificate = (props) => {
    const elementRef = useRef(null)
    const downloadCertificate = async () => {
      console.log(elementRef)
      toPng(elementRef.current, { cacheBust: false })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "certificate.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const image = (img) => {
        console.log(img)
        if (img.name) return URL.createObjectURL(img, {autoRevoke: true});
        else return process.env.REACT_APP_SERVER+"/api/images/"+img
    }
    return (
        <>
        <div className={styles.container} style={{backgroundImage: `url("${image(props.templateURL)}")`}} ref={elementRef}>
            <div className={styles.header}>
                <div className={styles.logo} style={{backgroundImage: `url("${image(props.logo)}")`}} >
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
                    <img className={styles.signature} src={image(props.signatureURL)}/>
                    <div className={styles.signerDetails}>
                        <div className={styles.signatory}>{props.signerDetails.name}</div>
                        <div className={styles.designation}>{props.signerDetails.designation}</div>
                    </div>
                </div>
            </div>
        </div>
        <button onClick={downloadCertificate}>Download</button>
        </>
    )
}

export default Certificate;