import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { PROTECTED_AVAILABLE_LANGUAGES } from '@/global.constants'
import { GlobalLanguageCode } from '@/global.interface'
import { useWords } from '@/hooks/words/use-words.hook'
import { selectedLanguageTagsSelector } from '@/recoil/words/tags.selectors'
import { FC, useCallback } from 'react'
import { useRecoilValue } from 'recoil'

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
  const selectedLanguages = useRecoilValue(selectedLanguageTagsSelector)
  const isSelected = selectedLanguages.includes(languageCode)
  const [loading, handleGetWordIds] = useWords()

  const onClick = useCallback(() => {
    const newSelectedLanguages = isSelected
      ? selectedLanguages.filter((code) => code !== languageCode)
      : [...selectedLanguages, languageCode]

    handleGetWordIds({
      languageCodes:
        newSelectedLanguages.length === 0 ? undefined : newSelectedLanguages,
    })
  }, [isSelected, selectedLanguages, languageCode, handleGetWordIds])

  return (
    <StyledTagButtonAtom
      label={getLabel(languageCode)}
      onClick={onClick}
      loading={loading}
      style={{
        variant: isSelected ? `filled` : `outlined`,
      }}
    />
  )
}

export default TagButtonLanguage
