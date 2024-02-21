import { ResponseWrapper } from '../types'
import { buildQueryParams } from '../utils'
import { API } from './api'

class CompanyService extends API {
  async getCompanies({
    keyword = '',
    page = 1,
  }: {
    keyword?: string
    page?: number
  }): Promise<ResponseWrapper> {
    const url = `company?` + buildQueryParams({ keyword, page })
    return this.getAPI(url)
  }

  async editCompany(id: string, payload: any) {
    //TODO: implement edit company
    // const url = `job/${id}`
    // return this.putAPI(url, { ...payload })
  }

  async deleteCompany(id: string) {
    //TODO: implement delete company
    // const url = `job/${id}`
    // return this.deleteAPI(url)
  }
}

const companyService = new CompanyService()

export default companyService