import { getBase64 } from "../../utils/utils";
import styles from "./CertificateForm.module.css"

const CertificateForm = (props) => {
  const signCertificate = async () => {
    const state = props.state;
    const res = await fetch(
      process.env.REACT_APP_SERVER + "/api/certificates/sign",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state }),
      }
    );
    const obj = await res.json();
    if (!obj.err) {
      props.onUpdate("qr", obj.qr);
    }
  };
  const uploadImage = async (e, key) => {
    getBase64(e.target.files[0], async (img) => {
      props.onUpdate(key, img);
    });
  };
  return (
    <>
      
      <div className={styles.instituteDetails}>
      <label htmlFor="templateUrl">TemplateURL</label>
        <input
          value={props.state.templateUrl}
          type="file"
          id="templateUrl"
          onChange={(e) => props.onUpdate("templateURL", e.target.value)}
        />
        <label htmlFor="logo">Institution-logo</label>
        <input
          value={props.state.logo}
          type="file"
          id="logo"
          onChange={(e) => props.onUpdate("logo", e.target.value)}
        />
        <label htmlFor="signer">Signer-Name</label>
        <input
          value={props.state.signerDetails.name}
          type="text"
          id="signer"
          onChange={(e) =>
            props.onUpdate("signerDetails", {
              name: e.target.value,
              designation: props.state.signerDetails.designation,
            })
          }
        />
        <label htmlFor="designation">Signer-designation</label>
        <input
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
        <label htmlFor="signUrl">signatureURL</label>
        <input
          value={props.state.signUrl}
          type="file"
          id="signUrl"
          onChange={(e) => props.onUpdate("signatureURL", e.target.value)}
        />
      </div>

      {/* user is the one on which certificate is to be issued */}
      <div className={styles.userDetails}>
        <label htmlFor="name">User-Name</label>
        <input
          value={props.state.name}
          type="text"
          id="name"
          onChange={(e) => props.onUpdate("name", e.target.value)}
        />
        <label htmlFor="title">Certificate-Title</label>
        <input
          value={props.state.title}
          type="text"
          id="title"
          onChange={(e) => props.onUpdate("title", e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <textarea
          value={props.state.description}
          id="description"
          onChange={(e) => props.onUpdate("description", e.target.value)}
        />
      </div>
    </>
  );
};
export default CertificateForm;
