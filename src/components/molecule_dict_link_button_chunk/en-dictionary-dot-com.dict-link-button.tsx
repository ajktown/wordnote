import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/states/words/words.state'
import StyledImageButtonAtom from '@/atoms/StyledImageButton'
import { useOpenNewTab } from '@/hooks/use-open-new-tab'

const DICTIONARY_DOT_COM_PREFIX = `https://www.dictionary.com/browse/`

interface Props {
  wordId: string
}
const EnDictionaryDotComDictLinkButton: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const link = DICTIONARY_DOT_COM_PREFIX + word?.term
  const onOpenNewTab = useOpenNewTab(link)

  if (!word || word.languageCode !== `en` || !word.term) return null

  return (
    <StyledImageButtonAtom
      url={link}
      onClick={onOpenNewTab}
      imageSrc="/dictionary_icons/dictionary-dot-com.png"
    />
  )
}

export default EnDictionaryDotComDictLinkButton
