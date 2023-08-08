import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/recoil/words/words.state'
import Image from 'next/image'
import { useOpenNewTab } from '@/hooks/use-open-new-tab'

const EN_KO_NAVER_DICTIONARY_PREFIX = `https://en.dict.naver.com/#/search?range=all&query=`

interface Props {
  wordId: string
}
const EnKoNaverDictionaryLinkButton: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const link = EN_KO_NAVER_DICTIONARY_PREFIX + word?.term
  const onClick = useOpenNewTab(link)

  if (!word || word.languageCode !== `en` || !word.term) return null

  return (
    <StyledIconButtonAtom
      onClick={onClick}
      jsxElementButton={
        <Image
          src="/dictionary_icons/naver-dictionary.png"
          alt="en-ko-naver-dictionary-link-button"
          width={20}
          height={20}
        />
      }
    />
  )
}

export default EnKoNaverDictionaryLinkButton
