import { ResponseWrapper } from '../types'
import { buildQueryParams } from '../utils'
import { API } from './api'

class UserService extends API {
  async getMe(): Promise<ResponseWrapper> {
    const url = 'user/me'
    return this.getAPI(url)
  }

  //TODO: Call to api GET /user/profile
  async getProfile(): Promise<ResponseWrapper> {
    const url = 'user/profile'
    return this.getAPI(url)
  }

  async getUsers({
    keyword = '',
    page = 1,
  }: {
    keyword?: string
    page?: number
  }): Promise<ResponseWrapper> {
    const url = `v1/admin/user?` + buildQueryParams({ keyword, page })
    return this.getAPI(url)
  }
}

const userService = new UserService()

export default userService
