export enum SearchType {
  Jobs = 'jobs',
  Companies = 'companies',
  Users = 'users',
  Requests = 'requests',
}

export type SearchParameter = {
  workLocationType?: string
  employmentType?: string
  yearsOfExperience?: string
  closingDate?: string
}
