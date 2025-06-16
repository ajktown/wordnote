import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/states/words/words.state'
import { useOpenNewTab } from '@/hooks/use-open-new-tab'
import StyledImageButtonAtom from '@/atoms/StyledImageButton'
import { preferenceState } from '@/states/preferences/preference.state'

const JA_KO_NAVER_DICTIONARY_PREFIX = `https://ja.dict.naver.com/#/search?range=all&query=`

interface Props {
  wordId: string
}
const JaKoNaverDictionaryLinkButton: FC<Props> = ({ wordId }) => {
  const preference = useRecoilValue(preferenceState)
  const word = useRecoilValue(wordsFamily(wordId))
  const link = JA_KO_NAVER_DICTIONARY_PREFIX + word?.term
  const onOpenNewTab = useOpenNewTab(link)

  if (!word || word.languageCode !== `ja` || !word.term) return null
  if (!preference?.nativeLanguages.includes(`ko`)) return null

  return (
    <StyledImageButtonAtom
      url={link}
      onClick={onOpenNewTab}
      imageSrc="/dictionary_icons/naver-dictionary.png"
    />
  )
}

export default JaKoNaverDictionaryLinkButton
