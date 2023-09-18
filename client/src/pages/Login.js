import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import styles from "../styles/Login.module.css";
import { Link } from 'react-router-dom';
import useDetectKeyboardOpen from "use-detect-keyboard-open";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const isKeyboardOpen = useDetectKeyboardOpen();


  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password, "institutions");
  };

  return (
    <>
      <form className={styles.login + " " + styles[isKeyboardOpen && "open"]} onSubmit={handleSubmit}>
        <div className={styles.name}>Login</div>
        <input
          className={styles.input}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          placeholder="Email"
        />
        <input
          className={styles.input}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          placeholder="Password"
        />

        <button className={styles.submit} disabled={isLoading}>Log in</button>
        {error && <div className="error">{error}</div>}
        <div className={styles.extra}>
          <span className={styles.addon} >Don't have an account?</span>
          <Link to="/signup"><span className={styles.signupText}> Sign up</span></Link>
        </div>
      </form>
    </>
  );
};

export default Login;
