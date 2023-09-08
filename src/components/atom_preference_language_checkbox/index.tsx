import { GlobalLanguageCode } from '@/global.interface'
import { preferenceState } from '@/recoil/preferences/preference.state'
import { Checkbox, FormControlLabel } from '@mui/material'
import { FC, SyntheticEvent } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'

interface Props {
  languageCode: GlobalLanguageCode
}

const PreferenceLanguageCheckbox: FC<Props> = ({ languageCode }) => {
  const preference = useRecoilValue(preferenceState)
  const onChange = useRecoilCallback(
    ({ set, snapshot }) =>
      async (e: SyntheticEvent<Element, Event>, checked: boolean) => {
        const preference = await snapshot.getPromise(preferenceState)
        if (!preference) return

        const nativeLanguagesSet = new Set([
          ...preference.nativeLanguages,
          languageCode,
        ])

        if (!checked) nativeLanguagesSet.delete(languageCode)
        const nativeLanguages: GlobalLanguageCode[] =
          Array.from(nativeLanguagesSet)

        set(preferenceState, {
          ...preference,
          nativeLanguages,
        })
      },
  )

  return (
    <FormControlLabel
      checked={preference?.nativeLanguages.includes(languageCode)}
      control={<Checkbox />}
      label={languageCode}
      onChange={onChange}
      value={languageCode}
    />
  )
}

export default PreferenceLanguageCheckbox
