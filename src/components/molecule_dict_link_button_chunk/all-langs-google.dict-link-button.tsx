import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/recoil/words/words.state'
import StyledImageButtonAtom from '@/atoms/StyledImageButton'
import { useOpenNewTab } from '@/hooks/use-open-new-tab'

const GOOGLE_PREFIX = `https://www.google.com/search?q=define%20`

interface Props {
  wordId: string
}
/** Google search is available for every language */
const AllLangsGoogleDictLinkButton: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const link = GOOGLE_PREFIX + word?.term
  const onClick = useOpenNewTab(link)

  if (!word?.term) return null

  return (
    <StyledImageButtonAtom
      url={link}
      onClick={onClick}
      imageSrc="/dictionary_icons/google-dictionary.png"
    />
  )
}

export default AllLangsGoogleDictLinkButton
