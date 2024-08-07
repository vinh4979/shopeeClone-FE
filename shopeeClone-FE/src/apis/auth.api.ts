import { AuthResponse } from '~/Types/auth.type'
import http from '~/utils/http'

interface BodyRegister {
  email: string
  password: string
}
export const registerAccount = (body: BodyRegister) => http.post<AuthResponse>('/register', body)

export const loginAccount = (body: BodyRegister) => http.post<AuthResponse>('/login', body)
