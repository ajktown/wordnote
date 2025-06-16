import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/states/words/words.state'
import { useOpenNewTab } from '@/hooks/use-open-new-tab'
import StyledImageButtonAtom from '@/atoms/StyledImageButton'

const EN_URBAN_DICTIONARY_PREFIX = `https://www.urbandictionary.com/define.php?term=`

interface Props {
  wordId: string
}
const EnUrbanDictionaryDictLinkButton: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const link = EN_URBAN_DICTIONARY_PREFIX + word?.term
  const onOpenNewTab = useOpenNewTab(link)

  if (!word || word.languageCode !== `en` || !word.term) return null

  return (
    <StyledImageButtonAtom
      url={link}
      onClick={onOpenNewTab}
      imageSrc="/dictionary_icons/urban-dictionary.png"
    />
  )
}

export default EnUrbanDictionaryDictLinkButton
