import { CustomizedApiError } from '@/errors'
import { isApiConnectFailed } from '@/states/apis/error-api-connection-fail.state'
import { useRecoilCallback } from 'recoil'
import { useOnSignOutApp } from './app/use-on-sign-out-app.hook'

type OnHandleApiError = (err: unknown) => any

export const useHandleApiError = () => {
  const onSignOutApp = useOnSignOutApp()

  const onHandleApiError: OnHandleApiError = useRecoilCallback(
    ({ set }) =>
      async (err: unknown) => {
        set(isApiConnectFailed, true)

        const error = CustomizedApiError.fromUnknown(err)
        if (error.props.statusCode === 401) {
          await onSignOutApp()
        }
      },
    [onSignOutApp],
  )

  return onHandleApiError
}
