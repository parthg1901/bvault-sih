import { getBase64 } from '../../utils/utils'

const CertificateForm = (props) => {
    const signCertificate = async () => {
        const state = props.state
        const res = await fetch(process.env.REACT_APP_SERVER+"/api/certificates/sign", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({state})
          })
          const obj = await res.json()
          if (!obj.err) {
            props.onUpdate("qr", obj.qr)
          }
    }
    const uploadImage = async (e, key) => {
        getBase64(e.target.files[0], async (img) => {
            props.onUpdate(key, img)
        })
    }
    return (
        <>
            <input type="text" onChange={(e) => props.onUpdate("name", e.target.value)} />
        </>
    )
}
export default CertificateForm