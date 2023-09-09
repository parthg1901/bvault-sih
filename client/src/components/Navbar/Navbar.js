import { Link, Navigate } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useState } from 'react'
import { useAdminContext } from '../../hooks/useAdminContext'

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
    <header>
      <div className="container">
        {count === 4 ? <Navigate to={`/admin`} /> : "" }
        <div onClick={updateCount}>
          BVault
        </div>
        <nav>
          <Link to="/">
            Scan
          </Link>
          {user && (
          <div>
            <span>{user.name}</span>
            <span>{user.verified === "yes" ? "Verified" : user.verified === "no" ? "Not Verified" : "Rejected"}</span>
            <button onClick={handleClick}>Log out</button>
            <Link to="/certify">Certify</Link>
          </div>
          )}
          {!user && (admin  ? (
            <div>
              <Link to="/admin">Institutions</Link>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar