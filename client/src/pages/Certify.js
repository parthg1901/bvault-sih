import { useState } from "react"
import CertificateForm from "../components/CertificateForm/CertificateForm"
import Certificate from "../components/Certificate/Certificate"

const Certify = () => {
    const [state, setState] = useState({
        logo: "", 
        name: "", 
        title: "", 
        description: "", 
        institution: "", 
        templateURL: "", 
        signatureURL: "", 
        signerDetails: {
            name: "",
            designation: ""
        },
        qr: ""
    })
    const onUpdate = (key, value) => {
        if (value) {
            setState({...state, [key]: value})
            console.log(state)
        }
    }
    return (
        <div>
            <CertificateForm state={state} onUpdate={onUpdate} />
            <Certificate {...state} />
        </div>
    )
}
export default Certify