import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/recoil/words/words.state'
import { useOpenNewTab } from '@/hooks/use-open-new-tab'
import StyledImageButtonAtom from '@/atoms/StyledImageButton'

const JA_EN_DEEPL_DICTIONARY_PREFIX = `https://www.deepl.com/ja/translator#en/ja/`

interface Props {
  wordId: string
}
const JaEnDeeplDictLinkButton: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const link = JA_EN_DEEPL_DICTIONARY_PREFIX + word?.term
  const onOpenNewTab = useOpenNewTab(link)

  if (!word || word.languageCode !== `en` || !word.term) return null

  return (
    <StyledImageButtonAtom
      url={link}
      onClick={onOpenNewTab}
      imageSrc="/dictionary_icons/deepl.png"
    />
  )
}

export default JaEnDeeplDictLinkButton
