import { useState } from "react"

const Institution = (props) => {
    const [proof, setProof] = useState(false)
    const showProof = () => {
        const pr = proof
        setProof(!pr)
    }
    const updateVerification = async (type) => {
        console.log("here")
        const res = await fetch(process.env.REACT_APP_SERVER+"/api/institutions/update", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            mode: "cors",
            body: JSON.stringify({i_id: props._id, verified: type})
        })
        const obj = await res.json()
        console.log(props._id)
        props.updateVerification(props._id, obj.verified)
    }
    return (
        <div>
            {props.verified}
            <div>{props.name}</div>
            <div>{props.email}</div>
            <button onClick={showProof}>{proof ? "Close" : "Show Proof"}</button>
            {proof ? (
                <img src={props.proofImage} alt="proof" />
            ) : ""}
            <div>
                {props.verified === "no" ? (
                    <>
                        <button onClick={() => updateVerification("yes")}>Approve</button>
                        <button onClick={() => updateVerification("rejected")}>Reject</button>
                    </>
                ) : props.verified === "yes" ? (
                    <div>Verified</div>
                ) : <div>Rejected</div>}
            </div>
        </div>
    )
}

export default Institution