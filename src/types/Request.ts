export type Request = {
  _id: string
  requestOwnerId?: string
  requestOwner?: string
  requestOwnerProfilePicture?: string
  requestTitle?: string
  company?: string
  country?: string
  division?: string
  city?: string
  workLocationType?: string
  employmentType?: string
  minimumSalary?: number
  totalCompensation?: number
  coverLetter?: string
  closingDate?: string
  resumeOrCV?: {
    fileName?: string
    fileSize?: string
    _id?: string
  }
  userSummary?: string
  skills?: Array<string>
  visibleTo?: string
  requestPostStatus?: number
  isSavedBy?: boolean
  hasResourceNote?: boolean
  hasInvited?: boolean
  savedCount?: number
  viewCount?: number
  inviteCount?: number
  inviteJobPostList?: any[]
  createdAt?: string
  updatedAt?: string
  resourceId?: string
}
