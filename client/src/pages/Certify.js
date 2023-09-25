import { useRef, useState } from "react";
import CertificateForm from "../components/CertificateForm/CertificateForm";
import Certificate from "../components/Certificate/Certificate";

const Certify = (props) => {
  const [preview, setPreview] = useState(false);
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
      designation: "",
    },
  });
  const onUpdate = (key, value) => {
    console.log(key);
    console.log(value);
    if (value) {
      setState({ ...state, [key]: value });
      console.log(state);
    }
  };
  return (
    <div>
      <CertificateForm
        state={state}
        onUpdate={onUpdate}
        setPreview={setPreview}
        {...props}
      />
      <Certificate
        {...state}
        preview={preview}
        setPreview={setPreview}
        {...props}
      />
    </div>
  );
};
export default Certify;
