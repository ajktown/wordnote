import { useRecoilCallback } from 'recoil'
import { preferenceState } from '@/states/preferences/preference.state'
import { GlobalLanguageCode } from '@/global.interface'
import { usePatchPreference } from './use-patch-preference.hook'

export const usePutPreferenceNativeLanguage = (
  languageCode: GlobalLanguageCode,
) => {
  const onPutPreference = usePatchPreference()
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

          await onPutPreference({ nativeLanguages })
        } catch {}
      },
    [onPutPreference, languageCode],
  )

  return onPutPreferenceNativeLanguage
}
