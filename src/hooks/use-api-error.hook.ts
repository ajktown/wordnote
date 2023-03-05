import { isApiConnectFailed } from '@/recoil/apis/error-api-connection-fail.state'
import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

type HandleApiError = (err: unknown) => any
type UseApiErrorHook = [HandleApiError]

export const useApiErrorHook = (): UseApiErrorHook => {
  const setApiConnectFailed = useSetRecoilState(isApiConnectFailed)

  const handleApiError: HandleApiError = useCallback((err: unknown) => {
    setApiConnectFailed(true)
  }, [])

  return [handleApiError]
}
