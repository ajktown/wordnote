import { axiosRequestSuccessLambda } from '@/lambdas/axios-request-success.lambda'
import { axiosRequestErrorLambda } from '@/lambdas/axios-request-error.lambda'
import axios from 'axios'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { axiosResponseSuccessLambda } from '@/lambdas/axios-response-success.lambda'
import { axiosResponseErrorLambda } from '@/lambdas/axios-response-error.lambda'

axios.interceptors.request.use(
  axiosRequestSuccessLambda,
  axiosRequestErrorLambda,
)

axios.interceptors.response.use(
  axiosResponseSuccessLambda,
  axiosResponseErrorLambda,
)

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default App
