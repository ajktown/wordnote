import axios, { InternalAxiosRequestConfig } from 'axios'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

// TODO: Put this outside of this _app.tsx
axios.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  // Do something before request is sent
  config.url = "http://localhost:8000/api" + config.url
  console.log("Requesting to URL: " + config.url)
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default App
