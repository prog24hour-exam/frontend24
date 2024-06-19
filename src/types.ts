export interface UserRequest {
  id: number | null
  password: string
}

export interface User {
  id: number | null
  roleNames: string[]
}

export interface RecaptchaRequest {
  token: string | null
}

export interface RecaptchaResponse {
  success: boolean
  'error-codes': string[]
}
