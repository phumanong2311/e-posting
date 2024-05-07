import { ContentPayload, ContentType, ResponseWrapper } from "../types";
import { buildQueryParams } from "../utils";
import { API } from "./api";

class ContentManagementService extends API {
  async getActiveContents({
    page = 1,
  }: {
    keyword?: string;
    page?: number;
  }): Promise<ResponseWrapper> {
    let url = `content?` + buildQueryParams({ page });
    return this.getAPI(url);
  }

  async getInActiveContents({
    page = 1,
  }: {
    keyword?: string;
    page?: number;
  }): Promise<ResponseWrapper> {
    let url = `content/media/inactive?` + buildQueryParams({ page });
    return this.getAPI(url);
  }

  async getDetail(id: string): Promise<ResponseWrapper> {
    const url = `content/${id}`
    return this.getAPI(url)
  }

  async getImageLogoUrl(file: File) {
    const url = `v2/files/media-upload`
    const formData = new FormData()
    formData.append('file', file)
    return this.postAPI(url, formData)
  }

  async create(content: ContentPayload) {
    const url = `content`
    return this.postAPI(url, content)
  }

  async edit(id: string, payload: any) {
    const url = `content/${id}`
    return this.putAPI(url, { ...payload })
  }
}

const contentManagementService = new ContentManagementService();

export default contentManagementService;
