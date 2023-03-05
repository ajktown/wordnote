import { axiosRequestSuccessLambda } from '@/lambdas/axios-request-success.lambda'
import { axiosRequestErrorLambda } from '@/lambdas/axios-request-error.lambda'
import axios from 'axios'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

axios.interceptors.request.use(
  axiosRequestSuccessLambda,
  axiosRequestErrorLambda,
)

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default App
