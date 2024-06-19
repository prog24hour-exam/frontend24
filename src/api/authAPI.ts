import { API_URL } from '../../settings'
import { makeOptions, handleHttpErrors } from '../fetchUtils'

const LOGIN_URL = API_URL + '/api/auth/login'

interface LoginResponse {
  email: string
  token: string
  roles: Array<string>
}

interface LoginRequest {
  email: string
  password: string
}

const authProvider = {
  isAuthenticated: false,
  signIn(user_: LoginRequest): Promise<LoginResponse> {
    const options = makeOptions('POST', user_)
    return fetch(LOGIN_URL, options).then(handleHttpErrors)
  },
}

export type { LoginResponse, LoginRequest }
export { authProvider }
