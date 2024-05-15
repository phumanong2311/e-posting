import { ResponseWrapper, SearchParameter, Skill } from '../types'
import { buildQueryParams } from '../utils'
import { API } from './api'

class SkillService extends API {
  async getSkills({
    keyword = '',
    page = 1,
  }: {
    keyword?: string
    page?: number
  }): Promise<ResponseWrapper> {
    let url = `skills?` + buildQueryParams({ keyword, page })
    return this.getAPI(url)
  }

  async getSkillDetail(id: string): Promise<ResponseWrapper> {
    const url = `skills/${id}`
    return this.getAPI(url)
  }

  async createSkill(skill: Skill) {
    const url = `skills`
    return this.postAPI(url, skill)
  }

  async editSkill(id: string, payload: any) {
    const url = `skills/${id}`
    return this.putAPI(url, { ...payload })
  }
}

const skillService = new SkillService()

export default skillService
