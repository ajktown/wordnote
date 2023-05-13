import { axiosRequestSuccessLambda } from '@/lambdas/axios-request-success.lambda'
import { axiosRequestErrorLambda } from '@/lambdas/axios-request-error.lambda'
import axios from 'axios'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { axiosResponseSuccessLambda } from '@/lambdas/axios-response-success.lambda'
import { axiosResponseErrorLambda } from '@/lambdas/axios-response-error.lambda'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { OauthConst } from '@/constants/oauth.constant'
import { useIsAppBooted } from '@/hooks/\bapp/use-is-app-booted.hook'
import StyledBackdrop from '@/organisms/StyledBackdrop'

axios.defaults.withCredentials = true

axios.interceptors.request.use(
  axiosRequestSuccessLambda,
  axiosRequestErrorLambda,
)

axios.interceptors.response.use(
  axiosResponseSuccessLambda,
  axiosResponseErrorLambda,
)

const AppBody = ({ Component, pageProps }: AppProps) => {
  if (!useIsAppBooted()) return <StyledBackdrop />

  return <Component {...pageProps} />
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <GoogleOAuthProvider clientId={OauthConst.GoogleClientId}>
        <AppBody {...pageProps} Component={Component} />
      </GoogleOAuthProvider>
    </RecoilRoot>
  )
}

export default App
