import { useRecoilCallback } from 'recoil'
import { preferenceState } from '@/recoil/preferences/preference.state'
import { GlobalLanguageCode } from '@/global.interface'
import { usePutPreference } from './use-put-preference.hook'

export const usePutPreferenceNativeLanguage = (
  languageCode: GlobalLanguageCode,
) => {
  const onUsePutPreference = usePutPreference()
  const onPutPreferenceNativeLanguage = useRecoilCallback(
    ({ snapshot }) =>
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

          await onUsePutPreference({ nativeLanguages })
        } catch {}
      },
    [onUsePutPreference, languageCode],
  )

  return onPutPreferenceNativeLanguage
}
