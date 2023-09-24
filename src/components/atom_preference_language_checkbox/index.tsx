import { putPreferenceApi } from '@/api/preferences/put-preference.api'
import { getLanguageFullName } from '@/global.constants'
import { GlobalLanguageCode } from '@/global.interface'
import { preferenceState } from '@/recoil/preferences/preference.state'
import { Checkbox, FormControlLabel } from '@mui/material'
import { FC } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'

interface Props {
  languageCode: GlobalLanguageCode
}

const PreferenceLanguageCheckbox: FC<Props> = ({ languageCode }) => {
  const preference = useRecoilValue(preferenceState)
  const onChange = useRecoilCallback(
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

  return (
    <FormControlLabel
      checked={preference?.nativeLanguages.includes(languageCode)}
      control={<Checkbox />}
      label={getLanguageFullName(languageCode)}
      onChange={onChange}
    />
  )
}

export default PreferenceLanguageCheckbox
