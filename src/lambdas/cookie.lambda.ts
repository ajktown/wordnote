import Cookies from 'js-cookie'

export enum CookieKey {
  AjktownSecuredAccessToken = `ASAT`,
}
export const cookieLambda = {
  get: (key: CookieKey) => {
    return Cookies.get(key)
  },
  set: (key: CookieKey, value: string) => {
    Cookies.set(key, value)
  },
}
