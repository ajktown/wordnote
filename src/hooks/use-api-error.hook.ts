import { CustomizedApiError } from '@/errors'
import { isApiConnectFailed } from '@/recoil/apis/error-api-connection-fail.state'
import { useRecoilCallback } from 'recoil'
import { useOnSignOutApp } from './app/use-on-sign-out-app.hook'

type OnApiErrorHook = (err: unknown) => any

export const useApiErrorHook = (): OnApiErrorHook => {
  const onAPiErrorHook = useOnSignOutApp()

  const onApiErrorHook: OnApiErrorHook = useRecoilCallback(
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

  return onApiErrorHook
}
