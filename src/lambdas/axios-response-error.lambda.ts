import { AxiosError } from 'axios'

export const axiosResponseErrorLambda = (error: AxiosError) => {
  return error
}
