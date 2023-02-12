export interface LoggedUser {
  auth?: UserCredentials
  user?: UserInformation
}

export interface UserCredentials {
  access_token: string
  access_secret: string
}

export interface UserInformation {
  id: number
  id_str: string
  name: string // nickname
  screen_name: string // @user
  description?: string
  protected: boolean
  verified: boolean
  followers_count: number
  friends_count: number // their "followings"
  listed_count: number
  favourites_count: number
  statuses_count: number // tweet number
  created_at: string
  profile_banner_url: string
  profile_image_url_https: string
  default_profile: boolean // if true, user didnt change banner
  default_profile_image: boolean // if true, user didnt change pfp
}