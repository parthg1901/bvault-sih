import { useState } from "react";
import  QrReader from "react-qr-scanner"
import Certificate from "../components/Certificate/Certificate";

const Home = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [err, setErr] =  useState("")
    const [isScan, setIsScan] = useState(true)
    const onQrScan = async (response) => {
      if (response !== null) {
        setIsScan(false)
        setLoading(true)
        alert("here")
        alert(JSON.stringify(JSON.parse(response.text).message))
        const res = await fetch("https://4000-test1883-certifysih-njz57y6v9kw.ws-us104.gitpod.io/api/certificates/verify", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          mode: "cors",
          body: response.text
        })
        const obj = await res.json()
        alert(JSON.stringify(obj))
        setData(obj)
      }
    }
    return (
        <div>
        {isScan ? (

        <QrReader
          delay={100}
          style={{
            height: 240,
            width: 320,
          }}
          onError={(err) => console.log(err)}
          onScan={onQrScan}
          constraints = {{
            video: {
              facingMode:"environment",
              legacyMode: true,
            }
          }}
          />
        ) : ""}
        {data ? <Certificate {...data.certificate} /> : ""}
        {loading}
        {JSON.stringify(err)}
        {JSON.stringify(data)}
      </div>
    )
}

export default Home