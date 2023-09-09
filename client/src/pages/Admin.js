import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import Institution from "../components/Institution/Institution";
import { useAdminContext } from "../hooks/useAdminContext";

const Admin = () => {
    const [address, setAddress] = useState(null)
    const [institutions, setInstitutions] = useState([])
    const {admin, dispatch} = useAdminContext()
    
    const addMetamask = useCallback(() => {
        if (window.ethereum) {
      
          window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((res) => {
                setAddress(res[0]); 
                localStorage.setItem("admin", "yes"); 
                dispatch({type: "ADMIN"})
            });
        } else {
          alert("install metamask extension!!");
        }
    }, [dispatch]);
    useEffect(() => {
        if (admin) {
            addMetamask()
        }
    }, [admin, addMetamask])

    useEffect(() => {
        const fetchData = async () => {
            if (address === process.env.REACT_APP_OWNER.toLowerCase()) {
                const res = await fetch(process.env.REACT_APP_SERVER+"/api/institutions/get", {
                    method: "GET",
                    headers: {'Content-Type': 'application/json'},
                    mode: "cors",
                })
                const obj = await res.json()
                console.log(obj)
                setInstitutions(obj)
            }
        }
        fetchData()
    }, [address])


    const updateVerification = (i_id, verified) => {
        const inst = [...institutions]
        for (let i = 0; i < inst.length; i++) {
            if (inst[i]._id === i_id) inst[i].verified = verified
        }
        console.log(inst)
        setInstitutions(inst)
    }
    console.log(institutions)
    return (
        <>
            {!address ? (
                <>
                    <div>Admin Login</div>
                    <button onClick={addMetamask}>Connect to Metamask</button>
                </>
            ) : address === process.env.REACT_APP_OWNER.toLowerCase() ? (
                <>
                {
                    institutions.map(institution => (
                        <div  key={institution._id}>
                            <Institution {...institution} updateVerification={updateVerification}/>
                        </div>
                    ))
                }
                </>
            ) : <Navigate to="/"/>}
        </>
    )
}

export default Admin