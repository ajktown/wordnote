import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { PROTECTED_AVAILABLE_LANGUAGES } from '@/global.constants'
import { GlobalLanguageCode, GlobalMuiTagVariant } from '@/global.interface'
import { selectedLanguageState } from '@/recoil/languages.state'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'

const getLabel = (languageCode: GlobalLanguageCode) => {
  for (const { code, nativeNameWithFlag } of PROTECTED_AVAILABLE_LANGUAGES) {
    if (languageCode === code) return nativeNameWithFlag
  }
  return `Unknown`
}

interface Props {
  languageCode: GlobalLanguageCode
}
const TagButtonLanguage: FC<Props> = ({ languageCode }) => {
  const [selectedLanguage, setSelectedLanguage] = useRecoilState(
    selectedLanguageState,
  )
  const onResetSelectedLanguage = useResetRecoilState(selectedLanguageState)

  const variant: GlobalMuiTagVariant = useMemo(() => {
    if (selectedLanguage === languageCode) return `filled`
    return `outlined`
  }, [selectedLanguage, languageCode])

  const onClick = useCallback(() => {
    if (languageCode === selectedLanguage) return onResetSelectedLanguage()
    setSelectedLanguage(languageCode)
  }, [
    selectedLanguage,
    languageCode,
    setSelectedLanguage,
    onResetSelectedLanguage,
  ])

  return (
    <StyledTagButtonAtom
      label={getLabel(languageCode)}
      onClick={onClick}
      style={{
        variant,
      }}
    />
  )
}

export default TagButtonLanguage
