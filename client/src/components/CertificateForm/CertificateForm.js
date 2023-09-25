import { DataURIToBlob } from "../../utils/utils";
import styles from "./CertificateForm.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import html2canvas from "html2canvas";
import { useState } from "react";
import VerifiedCertificate from "../VerifiedCertificate/VerifiedCertificate";

const CertificateForm = (props) => {
  const { user } = useAuthContext();
  const [issued, setIssued] = useState(false);
  const [state, setState] = useState({
    cid: "",
    _id: "",
    message: "",
    qr: "",
    timestamp: "",
  });
  const signCertificate = async (e) => {
    e.preventDefault();
    props.setModal("Gathering Data")
    const state = { ...props.state };
    console.log(state);
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${process.env.REACT_APP_PINATA}`,
      },
    };
    const data = new FormData();
    const element = document.getElementById("certificate"),
      canvas = await html2canvas(element),
      dataUrl = canvas.toDataURL("image/jpg");
    data.append(
      "file",
      DataURIToBlob(dataUrl),
      `certificate-${Date.now()}.png`
    );
    options.body = data;
    
    props.setModal("Upload to IPFS");
    const pin = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      options
    );
    const cid = (await pin.json()).IpfsHash;
    const message = `The ${state.title} has been issued to ${state.name}, by ${
      state.institution
    } on ${new Date().toLocaleDateString()}`;
    console.log(cid);
    console.log(message);
    props.setModal("Getting Government Signature")
    const res = await fetch(
      process.env.REACT_APP_SERVER + "/api/certificates/sign",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, cid }),
      }
    );
    const obj = await res.json();
    setState({ ...state, cid, message, ...obj });
    setIssued(true)
  };
  return (
    <form onSubmit={signCertificate} className={styles.form}>
        {!issued ? (
          <>
            <div className={styles.title}>Issue Certificate</div>
            <div className={styles.upload}>
              <label htmlFor="templateUrl">Upload Template</label>
              <input
                className={styles.inp}
                type="file"
                id="templateUrl"
                onChange={(e) =>
                  props.onUpdate("templateURL", e.target.files[0])
                }
              />
            </div>

            <div className={styles.upload}>
              <label htmlFor="logo">Upload Logo</label>
              <input
                className={styles.inp}
                type="file"
                id="logo"
                onChange={(e) => props.onUpdate("logo", e.target.files[0])}
              />
            </div>

            <input
              value={props.state.signerDetails.name}
              placeholder="Enter Issuer name"
              type="text"
              id="signer"
              onChange={(e) =>
                props.onUpdate("signerDetails", {
                  name: e.target.value,
                  designation: props.state.signerDetails.designation,
                })
              }
            />

            <input
              placeholder="Enter Issuer Designation"
              value={props.state.signerDetails.designation}
              type="text"
              id="designation"
              onChange={(e) =>
                props.onUpdate("signerDetails", {
                  name: props.state.signerDetails.name,
                  designation: e.target.value,
                })
              }
            />

            {/* user is the one on which certificate is to be issued */}

            <input
              placeholder="Enter User name"
              value={props.state.name}
              type="text"
              id="name"
              onChange={(e) => props.onUpdate("name", e.target.value)}
            />

            <input
              placeholder="Enter Certificate Title"
              value={props.state.title}
              type="text"
              id="title"
              onChange={(e) => props.onUpdate("title", e.target.value)}
            />

            <textarea
              placeholder="Enter Certificate Description"
              value={props.state.description}
              id="description"
              onChange={(e) => props.onUpdate("description", e.target.value)}
            />

            <div className={styles.upload}>
              <label htmlFor="signUrl">Upload Your Sign</label>
              <input
                className={styles.inp}
                type="file"
                id="signUrl"
                onChange={(e) =>
                  props.onUpdate("signatureURL", e.target.files[0])
                }
              />
            </div>

            <button type="submit" className={styles.submit_btn}>
              Certify
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                props.setPreview(true);
              }}
              className={styles.previewButton}
            >
              Preview
            </button>
          </>
        ) : (
          <VerifiedCertificate {...state} {...props}/>
        )}
    </form>
  );
};
export default CertificateForm;
