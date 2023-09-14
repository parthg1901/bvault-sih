import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { getBase64 } from "../utils/utils"

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [proofImage, setProofImage] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    await signup(name, email, password, "institutions", proofImage)
  }

  return (
    <form className="signup">
      <h3>Sign Up</h3>
      
      <label>Institution Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
        required
      />
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
        required
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        required
      />
      <label>Upload Proof Document: (photo)</label>
      <input
        type="file"
        onChange={(e) => setProofImage(e.target.files[0])}
        required
      />
      <button disabled={isLoading} onClick={handleSubmit}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup