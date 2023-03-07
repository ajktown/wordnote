import { InternalAxiosRequestConfig } from 'axios'

export const axiosRequestSuccessLambda = (
  config: InternalAxiosRequestConfig<any>,
) => {
  // Do something before request is sent
  config.url = `http://localhost:8000/api` + config.url
  console.log(`Requesting to URL: ` + config.url)
  return config
}
