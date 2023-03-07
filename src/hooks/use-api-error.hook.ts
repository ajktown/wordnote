import { isApiConnectFailed } from '@/recoil/apis/error-api-connection-fail.state'
import { useRecoilCallback } from 'recoil'

type HandleApiError = (err: unknown) => any
type UseApiErrorHook = HandleApiError

export const useApiErrorHook = (): UseApiErrorHook => {
  const handleApiError: HandleApiError = useRecoilCallback(
    ({ set }) =>
      async (err: unknown) => {
        console.log(err) // TODO: Actually use it

        set(isApiConnectFailed, true)
      },
    [],
  )

  return handleApiError
}
