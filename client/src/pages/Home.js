import { useEffect, useState } from "react";
import  QrReader from "react-qr-scanner"
import Certificate from "../components/Certificate/Certificate";
import { getBase64 } from "../utils/utils";
import {Html5Qrcode} from "html5-qrcode"
// import CropImage from "../components/CropImage/CropImage";
import useCallbackState from "../hooks/useCallbackState";


const Home = () => {
    const [data, setData] = useState(null)
    const [isScan, setIsScan] = useState(true)
    const [isCropped, setIsCropped] = useCallbackState(false)
    const [imgEvent, setImgEvent] = useState(null)
    const onCropped = async (imgBlob) => {
      let fileName = 'scan.jpg'
      let file = new File([imgBlob], fileName,{type:"image/jpeg", lastModified:new Date().getTime()}, 'utf-8');
      let container = new DataTransfer(); 
      container.items.add(file);
      document.querySelector('#file').files = container.files;
      setIsCropped(true, (newVal) => onQrScan(null,null, true, container.files[0], newVal))
    }
    const onQrScan = async (response, e, uploaded,file, cropped) => {
      let tmp;
      if (e) {
        setImgEvent(e)
      }
      console.log(isCropped)
      if (uploaded) {
        const resp = await new Html5Qrcode("file", "reader").scanFile(file)
        tmp = resp
        console.log(tmp)
      }else if (response !== null) {
        tmp = await response.text
      }
      if (tmp) {
        setIsScan(false)
        const res = await fetch(process.env.REACT_APP_SERVER+"/api/certificates/verify", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          mode: "cors",
          body: tmp
        })
        const obj = await res.json()
        setData(obj)
      }
    }
    return (
        <div>
        {isCropped.toString()}
        {isScan ? (
          <>
            <QrReader
              delay={100}
              style={{
                height: 240,
                width: 320,
              }}
              onError={(err) => console.log(err)}
              onScan={(response) => onQrScan(response,null, false)}
              constraints = {{
                video: {
                  facingMode:"environment",
                }
              }}
              legacymode = "true"
              />
            <input type="file" id="file" onChange={(e) => onQrScan(null,e, true, e.target.files[0])} />
            {/* <CropImage e={imgEvent} onCropped={onCropped} /> */}
          </>
        ) : <button onClick={() => {setIsScan(true); setData(null)}}>Another Scan</button>}
        {data ? <Certificate {...data.certificate} /> : ""}
        {JSON.stringify(data)}

      </div>
    )
}

export default Home