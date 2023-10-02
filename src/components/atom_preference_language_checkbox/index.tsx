import { putPreferenceApi } from '@/api/preferences/put-preference.api'
import { getLanguageFullName } from '@/global.constants'
import { GlobalLanguageCode } from '@/global.interface'
import { usePutPreference } from '@/hooks/preference/use-put-preference.hook'
import { preferenceState } from '@/recoil/preferences/preference.state'
import { Checkbox, FormControlLabel } from '@mui/material'
import { FC } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'

interface Props {
  languageCode: GlobalLanguageCode
}

const PreferenceLanguageCheckbox: FC<Props> = ({ languageCode }) => {
  const putPreference = usePutPreference(languageCode)
  const preference = useRecoilValue(preferenceState)
  const onChange = useRecoilCallback(
    ()=>{
      putPreference({})
    }
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
