export enum SearchType {
  Jobs = 'jobs',
  Companies = 'companies',
  Users = 'users',
}

export type SearchParameter = {
  workLocationType?: string
  employmentType?: string
  yearsOfExperience?: string
  closingDate?: string
}
