import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/recoil/words/words.state'
import Image from 'next/image'
import { useOnClickNewTab } from '@/hooks/use-on-click-open-new-tab.hook'

const EN_URBAN_DICTIONARY_PREFIX = `https://www.urbandictionary.com/define.php?term=`

interface Props {
  wordId: string
}
const EnUrbanDictionaryDictLinkButton: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const link = EN_URBAN_DICTIONARY_PREFIX + word?.term
  const onClick = useOnClickNewTab(link)

  if (!word || word.languageCode !== `en` || !word.term) return null

  return (
    <StyledIconButtonAtom
      onClick={onClick}
      jsxElementButton={
        <Image
          src="/dictionary_icons/urban-dictionary.png"
          alt="en-urban-dictionary-dictionary-link-button"
          width={20}
          height={20}
        />
      }
    />
  )
}

export default EnUrbanDictionaryDictLinkButton
