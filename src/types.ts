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

export interface AddressDto {
  id?: number
  street: string
  streetNumber: number
  city: string
  zipCode: string
  country: string
}

export interface AgeGroupDto {
  id?: number
  name?: string
  minAge?: number
  maxAge?: number
}

export interface ClubDto {
  id?: number
  name: string
  address?: AddressDto
}

export interface ResultTypeDto {
  id?: number
  unit?: string
}

export interface ParticipantDto {
  id?: number
  firstName: string
  lastName: string
  birthDate: string
  email: string
  phone: string
  ageGroup?: AgeGroupDto
  gender?: string
  club?: ClubDto
  disciplines?: DisciplineDto[]
}

export interface DisciplineDto {
  id?: number
  name: string
  description: string
  resultType?: ResultTypeDto
  participants?: ParticipantDto[]
}

export interface ResultDto {
  id?: number
  resultDate?: string
  resultValue?: number
  participant?: ParticipantDto
  discipline?: DisciplineDto
}
