import { getBase64 } from '../../utils/utils'
import styles from "./CertificateForm.module.css"
import { useAuthContext } from "../../hooks/useAuthContext"

const CertificateForm = (props) => {
    const { user } = useAuthContext()
    const signCertificate = async (e) => {
        e.preventDefault();
        
        const state = {...props.state}
        console.log(state)
        const data = new FormData()
        data.append("name", state.name)
        data.append("title", state.title)
        data.append("description", state.description)
        data.append("institution", user.name)
        data.append("signerName", state.signerDetails.name)
        data.append("signerDesignation", state.signerDetails.signerDesignation)
        data.append("templateURL", state.templateURL)
        data.append("signatureURL", state.signatureURL)
        data.append("logo", state.logo)

        const res = await fetch(process.env.REACT_APP_SERVER+"/api/certificates/sign", {
            method: "POST",
            body: data
          })
          const obj = await res.json()
          if (!obj.err) {
            props.onUpdate("qr", obj.qr)
          }
    }
    return (
        <form onSubmit={signCertificate}>
            <div className={styles.instituteDetails}>
      <label htmlFor="templateUrl">TemplateURL</label>
        <input
          type="file"
          id="templateUrl"
          onChange={(e) => props.onUpdate("templateURL", e.target.files[0])}
        />
        <label htmlFor="logo">Institution-logo</label>
        <input
          type="file"
          id="logo"
          onChange={(e) => props.onUpdate("logo", e.target.files[0])}
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
          type="file"
          id="signUrl"
          onChange={(e) => props.onUpdate("signatureURL", e.target.files[0])}
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
      <button type="submit">Certify</button>
        </form>
    )
}
export default CertificateForm