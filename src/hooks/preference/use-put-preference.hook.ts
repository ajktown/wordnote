import { useRecoilCallback } from 'recoil'
import { preferenceState } from '@/recoil/preferences/preference.state'
import { putPreferenceApi } from '@/api/preferences/put-preference.api'
import { PreferenceModifiable } from '@/api/preferences/index.interface'

export const usePutPreference = () => {
  const onPutPreference = useRecoilCallback(
    ({ set }) =>
      async (modifying: Partial<PreferenceModifiable>) => {
        try {
          const [data] = await putPreferenceApi(modifying)
          set(preferenceState, data)
        } catch {}
      },
    [],
  )

  return onPutPreference
}
