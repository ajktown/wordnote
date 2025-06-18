import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/states/words/words.state'
import StyledImageButtonAtom from '@/atoms/StyledImageButton'
import { useOpenNewTab } from '@/hooks/use-open-new-tab'
import { preferenceState } from '@/states/preferences/preference.state'

const KO_JA_NAVER_DICTIONARY_PREFIX = `https://korean.dict.naver.com/#/search?range=all&query=`

interface Props {
  wordId: string
}
const KoJaNaverDictionaryLinkButton: FC<Props> = ({ wordId }) => {
  const preference = useRecoilValue(preferenceState)
  const word = useRecoilValue(wordsFamily(wordId))
  const link = KO_JA_NAVER_DICTIONARY_PREFIX + word?.term
  const onOpenNewTab = useOpenNewTab(link)

  if (!word || word.languageCode !== `ko` || !word.term) return null
  if (!preference?.nativeLanguages.includes(`ja`)) return null

  return (
    <StyledImageButtonAtom
      url={link}
      onClick={onOpenNewTab}
      imageSrc="/dictionary_icons/naver-dictionary.png"
    />
  )
}

export default KoJaNaverDictionaryLinkButton
