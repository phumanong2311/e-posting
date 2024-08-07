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
  publisherName?: string;
  imageSourceUrl?: string;
  authorImage?: string;
  authorName?: string;
  authorTitle?: string;
  authorBio?: string;
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
  imageSource: string;
  authorImage?: string;
  publisherName?: string;
  authorName?: string;
  authorTitle?: string;
  authorBio?: string;
};

export type ContentPagination = {
  maxPages?: number;
  offset?: number;
  page?: number;
  pageSize?: number;
  totalContents?: number;
};
