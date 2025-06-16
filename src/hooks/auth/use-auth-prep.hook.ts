import { useRecoilCallback } from 'recoil'
import { GetAuthPrepRes, getAuthPrepApi } from '@/api/auth/get-auth-prep.api'
import { authPrepState } from '@/states/app/app.state'

type UseAuthPrep = () => Promise<GetAuthPrepRes | null>
export const useAuthPrep = (): UseAuthPrep => {
  const onGetAuthPrep: UseAuthPrep = useRecoilCallback(
    ({ set }) =>
      async () => {
        try {
          const [data] = await getAuthPrepApi()
          set(authPrepState, data)
          return data
        } catch {
          set(authPrepState, null)
          return null
        }
      },
    [],
  )

  return onGetAuthPrep
}
