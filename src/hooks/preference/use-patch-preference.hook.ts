import { useRecoilCallback } from 'recoil'
import { preferenceState } from '@/recoil/preferences/preference.state'
import { patchPreferenceApi } from '@/api/preferences/patch-preference.api'
import { PreferenceModifiable } from '@/api/preferences/index.interface'

export const usePatchPreference = () => {
  const onPatchPreference = useRecoilCallback(
    ({ set }) =>
      async (modifying: Partial<PreferenceModifiable>) => {
        try {
          const [data] = await patchPreferenceApi(modifying)
          set(preferenceState, data)
        } catch {}
      },
    [],
  )

  return onPatchPreference
}
