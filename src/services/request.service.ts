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
      ? `resources/search?` + buildQueryParams({ keyword, page })
      : `resources?` + buildQueryParams({ page })
    return this.getAPI(url)
  }

  async getRequestDetail(id: string): Promise<ResponseWrapper> {
    const url = `resources/${id}`
    return this.getAPI(url)
  }
}

const requestService = new RequestService()

export default requestService
