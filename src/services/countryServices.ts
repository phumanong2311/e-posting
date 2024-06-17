import { ResponseWrapper, Skill } from "../types";
import { buildQueryParams } from "../utils";
import { API } from "./api";

class CountryService extends API {
  async getCountries({
    keyword = "",
    page = 1,
  }: {
    keyword?: string;
    page?: number;
  }): Promise<ResponseWrapper> {
    let url = !!keyword
      ? `country/search?` + buildQueryParams({ keyword, page })
      : `country?` + buildQueryParams({ page });
    return this.getAPI(url);
  }

  async getCountryDetail(id: string): Promise<ResponseWrapper> {
    const url = `country/${id}`;
    return this.getAPI(url);
  }

  async createCountry(skill: Skill) {
    const url = `country`;
    return this.postAPI(url, skill);
  }

  async editCountry(id: string, payload: any) {
    const url = `country/${id}`;
    return this.putAPI(url, { ...payload });
  }
}

const countryService = new CountryService();

export default countryService;
