import { Company } from './Company'
import { ROLE } from './enums/role'

export type User = {
  email: string
  signupDate: string
  isEmailAuthenticated: boolean
  accountType: number
  accountStatus: string
  role: ROLE
  provider: string
  failedLoginAttempts: number
  favoriteCompany: Array<Company>
  followingUsers: Array<User>
  verificationToken: string
  createdAt: string
  updatedAt: string
  profile: string
  tokenExpirationDate: string
  id: string
}
