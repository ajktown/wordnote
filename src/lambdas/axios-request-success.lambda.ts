import { InternalAxiosRequestConfig } from 'axios'
import { envLambda } from './get-env.lambda'

/**
 * This lambda is used to modify the axios request before it is sent.
 */
export const axiosRequestSuccessLambda = (
  config: InternalAxiosRequestConfig<any>,
) => {
  const api_url: string = envLambda.getApiUrl()

  config.url = `${api_url}/api` + config.url
  console.log(`Requesting to URL: ` + config.url)
  console.log(`Params: ` + JSON.stringify(config.params))

  return config
}
