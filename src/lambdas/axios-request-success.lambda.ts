import { InternalAxiosRequestConfig } from 'axios'

const PRIVATE_DEFAULT_API_URL = `https://api.ajktown.com`
export const axiosRequestSuccessLambda = (
  config: InternalAxiosRequestConfig<any>,
) => {
  // Do something before request is sent
  const api_url: string =
    process.env.NEXT_PUBLIC_API_URL ?? PRIVATE_DEFAULT_API_URL

  config.url = `${api_url}/api` + config.url
  console.log(`Requesting to URL: ` + config.url)
  console.log(`Params: ` + JSON.stringify(config.params))

  return config
}
