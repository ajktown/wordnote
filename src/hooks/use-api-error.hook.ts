import { CustomizedApiError } from '@/errors'
import { isApiConnectFailed } from '@/recoil/apis/error-api-connection-fail.state'
import { useRecoilCallback } from 'recoil'
import { useOnClickSignOutApp } from './\bapp/use-on-click-sign-out-app'

type HandleApiError = (err: unknown) => any
type UseApiErrorHook = HandleApiError

export const useApiErrorHook = (): UseApiErrorHook => {
  const onSignOut = useOnClickSignOutApp()

  const handleApiError: HandleApiError = useRecoilCallback(
    ({ set }) =>
      async (err: unknown) => {
        set(isApiConnectFailed, true)

        const error = CustomizedApiError.fromUnknown(err)
        if (error.props.statusCode === 401) {
          await onSignOut()
        }
      },
    [onSignOut],
  )

  return handleApiError
}
