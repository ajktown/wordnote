import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/recoil/words/words.state'
import { useOpenNewTab } from '@/hooks/use-open-new-tab'
import StyledImageButtonAtom from '@/atoms/StyledImageButton'
import { preferenceState } from '@/recoil/preferences/preference.state'

const KO_NAVER_DICTIONARY_PREFIX = `https://ko.dict.naver.com/#/search?range=all&query=`

interface Props {
  wordId: string
}
const KoNaverDictionaryLinkButton: FC<Props> = ({ wordId }) => {
  const preference = useRecoilValue(preferenceState)
  const word = useRecoilValue(wordsFamily(wordId))
  const link = KO_NAVER_DICTIONARY_PREFIX + word?.term
  const onClick = useOpenNewTab(link)

  if (!word || word.languageCode !== `ko` || !word.term) return null
  if (!preference?.nativeLanguages.includes(`ko`)) return null

  return (
    <StyledImageButtonAtom
      url={link}
      onClick={onClick}
      imageSrc="/dictionary_icons/naver-dictionary.png"
    />
  )
}

export default KoNaverDictionaryLinkButton
