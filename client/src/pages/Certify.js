import { useState } from "react"
import CertificateForm from "../components/CertificateForm/CertificateForm"
import Certificate from "../components/Certificate/Certificate"

const Certify = () => {
    const [state, setState] = useState({
        logo: null, 
        name: "", 
        title: "", 
        description: "", 
        institution: "", 
        templateURL: null, 
        signatureURL: null, 
        signerDetails: {
            name: "",
            designation: ""
        },
        qr: null
    })
    const onUpdate = (key, value) => {
        setState({...state, [key]: value})
    }
    return (
        <div>
            <CertificateForm state={state} onUpdate={onUpdate} />
            <Certificate {...state} />
        </div>
    )
}
export default Certify