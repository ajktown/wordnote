import { getLanguageFullName } from '@/global.constants'
import { GlobalLanguageCode } from '@/global.interface'
import { preferenceState } from '@/recoil/preferences/preference.state'
import { Checkbox, FormControlLabel } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

interface Props {
  languageCode: GlobalLanguageCode
}

const PreferenceLanguageCheckbox: FC<Props> = ({ languageCode }) => {
  const preference = useRecoilValue(preferenceState)

  return (
    <FormControlLabel
      checked={preference?.nativeLanguages.includes(languageCode)}
      control={<Checkbox />}
      label={getLanguageFullName(languageCode)}
    />
  )
}

export default PreferenceLanguageCheckbox
