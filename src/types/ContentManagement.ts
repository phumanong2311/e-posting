export type ContentType = {
  posterId: string;
  posterName: string;
  title: string;
  contentType: string;
  tagline?: string;
  description?: string;
  publicationName?: string;
  displayImage?: string;
  imageSourceCitation: string;
  sourceUrl?: string;
  category?: string;
  mediaStatus: string;
  endDate?: string;
  publishDate?: string;
  createdAt?: string;
  updatedAt?: string;
  lastModifiedBy?: string;
  lastModifiedById?: string;
  contentId: string;
};

export type ContentPayload = {
  title: string;
  contentType: string;
  tagline?: string;
  description?: string;
  publicationName?: string;
  displayImage?: string;
  imageSourceCitation: string;
  sourceUrl?: string;
  category?: string;
  endDate?: string;
  publishDate?: string;
  mediaStatus: string;
};

export type ContentPagination = {
  maxPages?: number;
  offset?: number;
  page?: number;
  pageSize?: number;
  totalContents?: number;
};
