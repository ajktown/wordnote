import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/recoil/words/words.state'
import Image from 'next/image'
import { useOpenNewTab } from '@/hooks/use-open-new-tab'

const ZH_KO_NAVER_DICTIONARY_PREFIX = `https://zh.dict.naver.com/#/search?range=all&query=`

interface Props {
  wordId: string
}
const ZhKoNaverDictionaryLinkButton: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const link = ZH_KO_NAVER_DICTIONARY_PREFIX + word?.term
  const onClick = useOpenNewTab(link)

  if (!word || word.languageCode !== `zh` || !word.term) return null

  return (
    <StyledIconButtonAtom
      onClick={onClick}
      jsxElementButton={
        <Image
          src="/dictionary_icons/naver-dictionary.png"
          alt="zh-ko-naver-dictionary-link-button"
          width={20}
          height={20}
        />
      }
    />
  )
}

export default ZhKoNaverDictionaryLinkButton
