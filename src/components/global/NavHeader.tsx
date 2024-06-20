import { NavLink } from 'react-router-dom'
import AuthStatus from '../../security/AuthStatus'
import { useAuth } from '../../security/AuthProvider'

export default function NavHeader() {
  const { isLoggedInAs } = useAuth()

  return (
    <>
      <div className="navbar bg-base-100">
        {/* center of navbar */}
        <div className="">
          <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
            {/* only show these links if admin is logged in */}
            {isLoggedInAs(['ADMIN']) && (
              <>
                <li>
                  <NavLink to="/" className="text-lg">
                    <p>Home</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/results" className="text-lg">
                    <p>Results</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/participants" className="text-lg">
                    <p>Participants</p>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* right side of navbar */}
        <div className="navbar-end">
          <ul>
            <>
              <AuthStatus />
            </>
          </ul>
        </div>
      </div>
    </>
  )
}
