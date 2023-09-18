import { Link, Navigate } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useState } from 'react'
import { useAdminContext } from '../../hooks/useAdminContext'

import styles from "./Navbar.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faCircleCheck, faCircleInfo } from '@fortawesome/free-solid-svg-icons'

const Navbar = (props) => {
  const [count, setCount] = useState(0)
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const { admin } = useAdminContext()
  const handleClick = () => {
    logout()
  }
  const updateCount = () => {
    if(!admin) {
      const ct = count
      setCount(ct+1)
      console.log(count)
      setTimeout(()=>setCount(0), 3000)
    }
  }
  return (
      <div className={styles.container}>
        {count === 4 ? <Navigate to={`/admin`} /> : "" }
        <div onClick={updateCount} className={styles.logo}>
          <img src="B-Vault.png" alt="B-Vault"/>
        </div>
        <nav className={styles.nav}>
          <Link to="/">
            Scan
          </Link>
          {user && (
          <>
            <Link to="/certify">Certify</Link>
            <div className={styles.user + " " + styles[user.verified]}>
              <span>{user.name}</span>
              {user.verified === "yes" ? (
                <FontAwesomeIcon icon={faCircleCheck} color='rgb(0, 202, 0)'/>
              ) : user.verified === "no" ? (
                <FontAwesomeIcon icon={faCircleInfo} color='#FFBF00'/>
              ) : user.verified === "rejected" ? (
                <FontAwesomeIcon icon={faCircleXmark} color='rgb(255, 51, 51)'/>
              ) : ""}
            </div>
          </>
          )}
          {!user && (admin  ? (
            <>
              <Link to="/admin">Institutions</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
            </>
          ))}
        </nav>
      </div>
  )
}

export default Navbar