import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/recoil/words/words.state'
import Image from 'next/image'
import { useOnClickNewTab } from '@/hooks/use-on-click-open-new-tab.hook'

const JA_KO_NAVER_DICTIONARY_PREFIX = `https://ja.dict.naver.com/#/search?range=all&query=`

interface Props {
  wordId: string
}
const JaKoNaverDictionaryLinkButton: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const link = JA_KO_NAVER_DICTIONARY_PREFIX + word?.term
  const onClick = useOnClickNewTab(link)

  if (!word || word.languageCode !== `ja` || !word.term) return null

  return (
    <StyledIconButtonAtom
      onClick={onClick}
      jsxElementButton={
        <Image
          src="/dictionary_icons/naver-dictionary.png"
          alt="ja-ko-naver-dictionary-link-button"
          width={20}
          height={20}
        />
      }
    />
  )
}

export default JaKoNaverDictionaryLinkButton
