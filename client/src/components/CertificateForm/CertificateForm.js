import { createHelia } from 'helia'
import { strings } from '@helia/strings'
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
            const heliaNode = await createHelia()
            const s = strings(heliaNode)
            const myImmutableAddress = await s.add(img)
            console.log(await s.get(JSON.parse(JSON.stringify(myImmutableAddress))))
            console.log(await s.get(JSON.parse(`{"/":"bafkreigi7azw5vu22ez5ipzt7fgfxzgpeffij5oihu6bilr5kp7k626364"}`)))
        })
    }
    
    return (
        <input type="file" onChange={(e) => uploadImage(e, "h")} />
    )
}
export default CertificateForm