import { City, Country, Division, ResponseWrapper, Skill } from "../types";
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

  async getDivisions({
    keyword = "",
    page = 1,
  }: {
    keyword?: string;
    page?: number;
  }): Promise<ResponseWrapper> {
    let url = !!keyword
      ? `division/search?` + buildQueryParams({ keyword, page })
      : `division?` + buildQueryParams({ page });
    return this.getAPI(url);
  }

  async getCities({
    keyword = "",
    page = 1,
  }: {
    keyword?: string;
    page?: number;
  }): Promise<ResponseWrapper> {
    let url = !!keyword
      ? `city/search?` + buildQueryParams({ keyword, page })
      : `city?` + buildQueryParams({ page });
    return this.getAPI(url);
  }

  async getCountryDetail(id: string): Promise<ResponseWrapper> {
    const url = `country/${id}`;
    return this.getAPI(url);
  }

  async createCountry(country: Country) {
    const url = `country`;
    return this.postAPI(url, country);
  }

  async editCountry(id: string, payload: any) {
    const url = `country/${id}`;
    return this.putAPI(url, { ...payload });
  }

  async getDivisionDetail(id: string): Promise<ResponseWrapper> {
    const url = `division/${id}`;
    return this.getAPI(url);
  }

  async createDivision(division: Division) {
    const url = `division`;
    return this.postAPI(url, division);
  }

  async editDivision(id: string, payload: any) {
    const url = `division/${id}`;
    return this.putAPI(url, { ...payload });
  }

  async getCityDetail(id: string): Promise<ResponseWrapper> {
    const url = `city/${id}`;
    return this.getAPI(url);
  }

  async createCity(city: City) {
    const url = `city`;
    return this.postAPI(url, city);
  }

  async editCity(id: string, payload: any) {
    const url = `city/${id}`;
    return this.putAPI(url, { ...payload });
  }
}

const countryService = new CountryService();

export default countryService;
