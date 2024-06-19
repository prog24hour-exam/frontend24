import { createContext, useState, ReactNode } from 'react'
import { authProvider } from '../services/api/authAPI'
import { useContext } from 'react'
import { LoginResponse, LoginRequest } from '../services/api/authAPI'
import { User } from '../types'

interface AuthContextType {
  email: string | null
  signIn: (user: User) => Promise<LoginResponse>
  signOut: () => void
  isLoggedIn: () => boolean
  isLoggedInAs: (role: string[]) => boolean
}

const AuthContext = createContext<AuthContextType>(null!)

export default function AuthProvider({ children }: { children: ReactNode }) {
  //We use this to distinguish between being logged in or not
  const initialEmail = localStorage.getItem('email') || null
  const [email, setEmail] = useState<string | null>(initialEmail)

  const signIn = async (user_: LoginRequest) => {
    return authProvider.signIn(user_).then((user) => {
      setEmail(user.email)
      localStorage.setItem('email', user.email)
      localStorage.setItem('roles', JSON.stringify(user.roles))
      localStorage.setItem('token', user.token)
      return user
    })
  }

  //Observe how we can sign user out without involving the backend (is that (always) good?)
  const signOut = () => {
    setEmail(null)
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('roles')
  }

  function isLoggedIn() {
    return email != null
  }

  function isLoggedInAs(role: string[]) {
    const roles: Array<string> = JSON.parse(
      localStorage.getItem('roles') || '[]',
    )
    return roles?.some((r) => role.includes(r)) || false
  }

  const value = { email, isLoggedIn, isLoggedInAs, signIn, signOut }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
