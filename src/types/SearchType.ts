export enum SearchType {
  Jobs = "jobs",
  Companies = "companies",
}

export type SearchParameter = {
  workLocationType?: string;
  employmentType?: string;
  yearsOfExperience?: string;
  closingDate?: string;
};
