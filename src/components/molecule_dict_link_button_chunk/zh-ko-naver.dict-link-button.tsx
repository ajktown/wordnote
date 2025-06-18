import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/states/words/words.state'
import { useOpenNewTab } from '@/hooks/use-open-new-tab'
import StyledImageButtonAtom from '@/atoms/StyledImageButton'

const ZH_KO_NAVER_DICTIONARY_PREFIX = `https://zh.dict.naver.com/#/search?range=all&query=`

interface Props {
  wordId: string
}
const ZhKoNaverDictionaryLinkButton: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const link = ZH_KO_NAVER_DICTIONARY_PREFIX + word?.term
  const onOpenNewTab = useOpenNewTab(link)

  if (!word || word.languageCode !== `zh` || !word.term) return null

  return (
    <StyledImageButtonAtom
      url={link}
      onClick={onOpenNewTab}
      imageSrc="/dictionary_icons/naver-dictionary.png"
    />
  )
}

export default ZhKoNaverDictionaryLinkButton
