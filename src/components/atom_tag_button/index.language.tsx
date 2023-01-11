import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { PROTECTED_AVAILABLE_LANGUAGES } from '@/global.constants'
import { GlobalLanguageCode, GlobalMuiTagVariant } from '@/global.interface'
import { selectedLanguageState } from '@/recoil/semesters.state'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'

const getLabel = (languageCode: GlobalLanguageCode) => {
  for (const { code, nativeNameWithFlag } of PROTECTED_AVAILABLE_LANGUAGES) {
    if (languageCode === code) return nativeNameWithFlag
  }
  return "Unknown"
}

interface Props {
  languageCode: GlobalLanguageCode
}
const TagButtonLanguage: FC<Props> = ({ languageCode }) => {
  const [selectedLanguage, setSelectedLanguage] = useRecoilState(selectedLanguageState)
  const resetSelectedLanguage = useResetRecoilState(selectedLanguageState)

  const variant: GlobalMuiTagVariant = useMemo(() => {
    if (selectedLanguage === languageCode) return "filled"
    return "outlined"
  }, [selectedLanguage, languageCode])

  const handleClick = useCallback(() => {
    if (languageCode === selectedLanguage)
      return resetSelectedLanguage()
    setSelectedLanguage(languageCode)
  }, [selectedLanguage, languageCode, setSelectedLanguage, resetSelectedLanguage])

  return (
    <StyledTagButtonAtom
      label={getLabel(languageCode)}
      onClick={handleClick}
      style={{
        variant
      }}
    />
  )
}

export default TagButtonLanguage