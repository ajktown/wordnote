import StyledChip from '@/atoms/StyledChip'
import { getLanguageFullName } from '@/global.constants'
import { GlobalLanguageCode } from '@/global.interface'
import { useWords } from '@/hooks/words/use-words.hook'
import { selectedLanguageTagsSelector } from '@/recoil/words/words.selectors'
import { FC, useCallback } from 'react'
import { useRecoilValue } from 'recoil'

interface Props {
  languageCode: GlobalLanguageCode
}
const TagChipLanguage: FC<Props> = ({ languageCode }) => {
  const selectedLanguages = useRecoilValue(selectedLanguageTagsSelector)
  const isSelected = selectedLanguages.includes(languageCode)
  const [loading, getWords] = useWords()

  const onClick = useCallback(async () => {
    const newSelectedLanguages = isSelected
      ? selectedLanguages.filter((code) => code !== languageCode)
      : [...selectedLanguages, languageCode]

    try {
      await getWords({
        languageCodes:
          newSelectedLanguages.length === 0 ? undefined : newSelectedLanguages,
      })
    } catch {}
  }, [isSelected, selectedLanguages, languageCode, getWords])

  return (
    <StyledChip
      label={getLanguageFullName(languageCode)}
      onClick={onClick}
      loading={loading}
      style={{
        variant: isSelected ? `filled` : `outlined`,
      }}
    />
  )
}

export default TagChipLanguage