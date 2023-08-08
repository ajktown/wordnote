import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/recoil/words/words.state'
import Image from 'next/image'
import { useOnClickNewTab } from '@/hooks/use-on-click-open-new-tab.hook'

const DICTIONARY_DOT_COM_PREFIX = `https://www.dictionary.com/browse/`

interface Props {
  wordId: string
}
const EnDictionaryDotComDictLinkButton: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const link = DICTIONARY_DOT_COM_PREFIX + word?.term
  const onClick = useOnClickNewTab(link)

  if (!word || word.languageCode !== `en` || !word.term) return null

  return (
    <StyledIconButtonAtom
      onClick={onClick}
      jsxElementButton={
        <Image
          src="/dictionary_icons/dictionary-dot-com.png"
          alt="en-dictionary-dot-com-dictionary-link-button"
          width={20}
          height={20}
        />
      }
    />
  )
}

export default EnDictionaryDotComDictLinkButton
