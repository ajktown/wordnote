import { CustomizedApiError } from '@/errors'
import { isApiConnectFailed } from '@/recoil/apis/error-api-connection-fail.state'
import { useRecoilCallback } from 'recoil'
import { useOnSignOutApp } from './app/use-on-sign-out-app.hook'

type HandleApiError = (err: unknown) => any

export const useApiErrorHook = (): HandleApiError => {
  const onAPiErrorHook = useOnSignOutApp()

  const handleApiError: HandleApiError = useRecoilCallback(
    ({ set }) =>
      async (err: unknown) => {
        set(isApiConnectFailed, true)

        const error = CustomizedApiError.fromUnknown(err)
        if (error.props.statusCode === 401) {
          await onAPiErrorHook()
        }
      },
    [onAPiErrorHook],
  )

  return handleApiError
}
