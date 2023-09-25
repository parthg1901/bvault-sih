import { useState } from "react";
import QrReader from "react-qr-scanner";
import { Html5Qrcode } from "html5-qrcode";

import QrOverlay from "../assets/QrOverlay";
import QrLine from "../assets/QrLine";
import styles from "../styles/Home.module.css";
import loadingGif from "../assets/loadingGif.gif";
import UploadFileSvg from "../assets/uploadFileSvg";
import VerifiedCertificate from "../components/VerifiedCertificate/VerifiedCertificate";

const Home = () => {
  const [data, setData] = useState(null);
  const [isScan, setIsScan] = useState(true);
  const [scanning, setScanning] = useState(false);

  const onQrScan = async (response, e, uploaded, file) => {
    let scannedData;
    setScanning(true);
    try {
      if (uploaded) {
        const resp = await new Html5Qrcode("file", "reader").scanFile(file);
        scannedData = resp;
        console.log(scannedData);
      } else if (response !== null) {
        scannedData = await response.text;
      }
      if (scannedData) {
        setIsScan(false);
        const res = await fetch(
          process.env.REACT_APP_SERVER + "/api/certificates/verify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            body: scannedData,
          }
        );
        const obj = await res.json();
        if (res.status === 404) {
          alert(obj.msg);
          setIsScan(true);
        } else {
          setScanning(false);
          setData(obj);
        }
      }
    } catch (error) {
      alert("Invalid QR Code! Try Again");
      setIsScan(true);
    }
  };
  return (
    <div>
      {scanning && (
        <div className={styles.loader}>
          <p>Scanning</p>
          <img
            className={styles.loadingGif}
            src={loadingGif}
            alt="Scanning"
          ></img>
        </div>
      )}
      {isScan ? (
        <>
          <div className={styles.videoOverlay}>
            <QrOverlay className={styles.ScanOverlay}></QrOverlay>
            <QrLine className={styles.qrLine} />
            <div className={styles.qrContainer}>
              <QrReader
                delay={100}
                style={{
                  height: 255,
                  width: 340,
                }}
                onError={(err) => console.log(err)}
                onScan={(response) => onQrScan(response, null, false)}
                constraints={{
                  video: {
                    facingMode: "environment",
                  },
                }}
                legacymode="true"
              />
            </div>
          </div>
          <div className={styles.uploadContainer}>
            <label htmlFor="file">
              <UploadFileSvg />
            </label>
            <input
              className={styles.fileInput}
              type="file"
              id="file"
              onChange={(e) => onQrScan(null, e, true, e.target.files[0])}
            />
          </div>
        </>
      ) : (
        ""
      )}
      {data ? <VerifiedCertificate setModal={(d) => {}} {...data} /> : ""}
    </div>
  );
};

export default Home;
