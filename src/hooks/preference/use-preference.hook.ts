import { useRecoilCallback } from 'recoil'
import { preferenceState } from '@/recoil/preferences/preference.state'
import { getPreferenceApi } from '@/api/preferences/get-preferences.api'

/** Gets the latest preference data of the signed end user
 * from the server and updates the preference state.
 */
export const usePreference = () => {
  const onClick = useRecoilCallback(
    ({ set }) =>
      async () => {
        const [data] = await getPreferenceApi()
        set(preferenceState, data)
      },
    [],
  )

  return onClick
}
