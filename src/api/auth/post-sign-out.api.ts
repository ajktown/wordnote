import axios from 'axios'

/**
Requests API server to delete HttpOnly Cookies.
Used when browser wants to delete http only cookie.
 */
export const postSignOut = async (): Promise<void> => {
  const url = `/v1/auth/sign-out`
  return axios.post(url)
}
