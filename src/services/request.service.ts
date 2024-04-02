import { ResponseWrapper } from '../types'
import { buildQueryParams } from '../utils'
import { API } from './api'

class RequestService extends API {
  async getResources({
    keyword = '',
    page = 1,
  }: {
    keyword?: string
    page?: number
  }): Promise<ResponseWrapper> {
    let url = keyword
      ? `/resources/search?` + buildQueryParams({ keyword, page })
      : `/resources?` + buildQueryParams({ page })
    return this.getAPI(url)
  }

  //   async getUserDetail(id: string): Promise<ResponseWrapper> {
  //     const url = `v1/admin/user/${id}`
  //     console.log(url)
  //     return this.getAPI(url)
  //   }

  //   async editUser(id: string, payload: any) {
  //     const url = `v1/admin/user/${id}`
  //     return this.putAPI(url, { ...payload })
  //   }
}

const requestService = new RequestService()

export default requestService
