import { Link, Navigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import { useAdminContext } from "../../hooks/useAdminContext";
import styles from  './Navbar.module.css';
import LogoComponent from '../../UIcomponents/BvaultLogo'


const Navbar = (props) => {
  const [count, setCount] = useState(0);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { admin } = useAdminContext();
  const handleClick = () => {
    logout();
  };
  const updateCount = () => {
    if (!admin) {
      const ct = count;
      setCount(ct + 1);
      console.log(count);
      setTimeout(() => setCount(0), 3000);
    }
  };
  return (
    <>
      {count === 4 ? <Navigate to={`/admin`} /> : ""}
      <div onClick={updateCount} className={styles.Bvault}>B-Vault</div>
      <LogoComponent/>

      {user && (
        <div>
          <span>{user.name}</span>
          <span>
            {user.verified === "yes"
              ? "Verified"
              : user.verified === "no"
              ? "Not Verified"
              : "Rejected"}
          </span>
          <button className={styles.button} onClick={handleClick}>Log out</button>
          <Link to="/certify"><button className={styles.button}>Certify</button></Link>
        </div>
      )}
      {!user &&
        (admin ? (
          <div>
            <Link to="/admin">Institutions</Link>
          </div>
        ) : (
          <div className={styles.auth}>
            <Link to="/login"><button className={styles.button}>Login</button></Link>
            <Link to="/signup"><button className={styles.button}>Signup </button></Link>
          </div>
        ))}
      {/* <Link to="/">Scan</Link> */}
    </>
  );
};

export default Navbar;