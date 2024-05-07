import { ResponseWrapper, SearchParameter } from '../types'
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

  async editRequest(id: string, payload: any) {
    const url = `resources/${id}`
    return this.putAPI(url, { ...payload })
  }

  async deleteRequest(id: string) {
    const url = `resources/${id}`
    return this.deleteAPI(url)
  }

  async getRequests({
    searchParameter,
    page = 1,
  }: {
    searchParameter: SearchParameter
    page?: number
  }): Promise<ResponseWrapper> {
    const url = `resources?` + buildQueryParams({ ...searchParameter, page })
    return this.getAPI(url)
  }

  async getMyRequests({ page = 1 }: { page?: number }): Promise<ResponseWrapper> {
    const url = `resources/user/requests?page=${page}`
    return this.getAPI(url)
  }


  async getRequestsByOwner({ requestOwnerId = '', page = 1 }) {
    const url = `resources/owner/${requestOwnerId}?page=${page}`
    return this.getAPI(url)
  }

  async getRequestSearch({
    searchParameter,
    page = 1,
    keyword = '',
  }: {
    searchParameter: SearchParameter
    page?: number
    keyword: string
  }): Promise<ResponseWrapper> {
    const url =
      `resources/search?` +
      buildQueryParams({
        ...searchParameter,
        keyword,
        page,
      })
    return this.getAPI(url)
  }

  async getTopRequestPosters(month: number, year: number, startDate?: Date, endDate?: Date): Promise<{ requestOwner: string; numPostings: number }[]> {
    let currentPage = 1;
    let allRequestPosters: any[] = [];

    while (true) {
        const allRequestsResponse = await this.getRequests({ searchParameter: {}, page: currentPage });
        if (!allRequestsResponse.success || !allRequestsResponse.result) {
            break;
        }

        const requests = allRequestsResponse.result.requests;

        const currentMonthRequests = requests.filter((request: any) => {
            const requestDate = new Date(request.createdAt);
            return requestDate.getMonth() + 1 === month && requestDate.getFullYear() === year;
        });

        allRequestPosters = [...allRequestPosters, ...currentMonthRequests];

        currentPage++;

        if (requests.length < 20) {
            break;
        }
    }

    if (startDate) {
      allRequestPosters = allRequestPosters.filter((request: any) => new Date(request.createdAt) >= startDate);
    }
    if (endDate) {
      allRequestPosters = allRequestPosters.filter((request: any) => new Date(request.createdAt) <= endDate);
    }

    const requestPosters: Record<string, number> = {};
    allRequestPosters.forEach((request) => {
        const requestOwner = request.requestOwner;
        requestPosters[requestOwner] = (requestPosters[requestOwner] || 0) + 1;
    });

    const topRequestPosters = Object.keys(requestPosters).map((requestOwner) => ({
        requestOwner,
        numPostings: requestPosters[requestOwner],
    }));
    topRequestPosters.sort((a, b) => b.numPostings - a.numPostings);

    return topRequestPosters.slice(0, 20);
  }
}



const requestService = new RequestService()

export default requestService
