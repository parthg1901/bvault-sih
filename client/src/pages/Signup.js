import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { getBase64 } from "../utils/utils"
import styles from "../styles/Signup.module.css"
import useDetectKeyboardOpen from "use-detect-keyboard-open";


const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [proofImage, setProofImage] = useState('')
  const {signup, error, isLoading} = useSignup()
  const isKeyboardOpen = useDetectKeyboardOpen();
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    await signup(name, email, password, "institutions", proofImage)
  }

  return (
    <>
    <form className= {styles.signup + " " + styles[isKeyboardOpen && "open"]}>
    <h3 className={styles.name}>Signup</h3>
      
      <input className={styles.input}
        type="text" 
        placeholder="Institution Name"
        onChange={(e) => setName(e.target.value)} 
        value={name} 
        required
      />

      <input className={styles.input}
        type="email" 
        placeholder="Email address"
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
        required
      />

      <input className={styles.input}
        type="password" 
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        required
      />
      <div className={styles.upload}>
        <label>Upload ID Below</label>
        <input
          type="file"
          onChange={(e) => setProofImage(e.target.files[0])}
          required
        />
      </div>
      <button disabled={isLoading} onClick={handleSubmit} className={styles.submit}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
    </>
  )
}

export default Signup