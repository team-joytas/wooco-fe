export type UserProfileType = {
  name: string
  user_id: string
  profile_url: string
  description?: string
  on_boarding: boolean
}

export type UpdateUserType = {
  name: string
  description?: string
  profile_url: string
}

export type WriterType = {
  id: string
  name: string
  profile_url: string
}

export type UserLikeRegionType = {
  id: string
  primary_region: string
  secondary_region: string
}
