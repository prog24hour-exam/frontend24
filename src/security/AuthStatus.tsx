import { NavLink } from 'react-router-dom'
import { useAuth } from './AuthProvider'

export default function AuthStatus() {
  const auth = useAuth()

  if (!auth.isLoggedIn()) {
    return (
      <li className="nav-item">
        <NavLink to="/login" className="nav-links">
          Login
        </NavLink>
      </li>
    )
  } else {
    return (
      <li className="nav-item">
        <NavLink to="/logout" className="nav-links">
          Logout (Logged in as {auth.email})
        </NavLink>
      </li>
    )
  }
}
