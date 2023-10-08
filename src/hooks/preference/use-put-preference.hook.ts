import { useRecoilCallback } from 'recoil'
import { preferenceState } from '@/recoil/preferences/preference.state'
import { putPreferenceApi } from '@/api/preferences/put-preference.api'
import { GlobalLanguageCode } from '@/global.interface'

export const usePutPreference = (languageCode: GlobalLanguageCode) => {
  const onPutPreference = useRecoilCallback(
    ({ set, snapshot }) =>
      async (_, checked: boolean) => {
        try {
          const preference = await snapshot.getPromise(preferenceState)
          if (!preference) return

          const nativeLanguagesSet = new Set([
            ...preference.nativeLanguages,
            languageCode,
          ])

          if (!checked) nativeLanguagesSet.delete(languageCode)
          const nativeLanguages: GlobalLanguageCode[] =
            Array.from(nativeLanguagesSet)

          const [data] = await putPreferenceApi({ nativeLanguages })
          set(preferenceState, data)
        } catch {}
      },
    [languageCode],
  )

  return onPutPreference
}
