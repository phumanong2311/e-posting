import { ResponseWrapper, SearchParameter } from '../types'
import { buildQueryParams } from '../utils'
import { API } from './api'


class NotificationService extends API {
  async getNotifications({
    searchParameter,
  }: {
    searchParameter: SearchParameter
  }): Promise<ResponseWrapper> {
    const url = `consumer-admin?` + buildQueryParams({ ...searchParameter})
    return this.getAPI(url)
  }

  async getListNotifications(payload: any) {
    return this.getAPI('consumer-admin', { ...payload })
  }
}


const notificationService = new NotificationService()

export default notificationService
