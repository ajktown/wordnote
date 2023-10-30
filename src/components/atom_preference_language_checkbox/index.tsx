import { getLanguageFullName } from '@/global.constants'
import { GlobalLanguageCode } from '@/global.interface'
import { usePutPreferenceNativeLanguage } from '@/hooks/preference/use-put-preference-native-language.hook'
import { preferenceState } from '@/recoil/preferences/preference.state'
import { Checkbox, FormControlLabel } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

interface Props {
  languageCode: GlobalLanguageCode
}

const PreferenceLanguageCheckbox: FC<Props> = ({ languageCode }) => {
  const onPutPreferenceNativeLanguage =
    usePutPreferenceNativeLanguage(languageCode)
  const preference = useRecoilValue(preferenceState)

  return (
    <FormControlLabel
      checked={preference?.nativeLanguages.includes(languageCode)}
      control={<Checkbox />}
      label={getLanguageFullName(languageCode)}
      onChange={onPutPreferenceNativeLanguage}
    />
  )
}

export default PreferenceLanguageCheckbox
