import { useState } from "react";
import  QrReader from "react-qr-scanner"
import Certificate from "../components/Certificate/Certificate";
import { getBase64 } from "../utils/utils";

const Home = () => {
    const [data, setData] = useState(null)
    const [isScan, setIsScan] = useState(true)
    const onQrScan = async (response, e, uploaded) => {
      if (uploaded) {
        getBase64(e.target.files[0],async (qr) => {
          const res = await fetch(process.env.REACT_APP_SERVER+"/api/certificates/verify", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({qr})
          })
          const obj = await res.json()
          if (!obj.msg) {
            setIsScan(false)
            setData(obj)
          }
        })
      }else if (response !== null) {
        setIsScan(false)
        const res = await fetch(process.env.REACT_APP_SERVER+"/api/certificates/verify", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          mode: "cors",
          body: response.text
        })
        const obj = await res.json()
        setData(obj)
      }
    }
    return (
        <div>
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
            <input type="file" onChange={(e) => onQrScan(null,e, true)} />
          </>
        ) : <button onClick={() => {setIsScan(true); setData(null)}}>Another Scan</button>}
        {data ? <Certificate {...data.certificate} /> : ""}
        {JSON.stringify(data)}
      </div>
    )
}

export default Home