import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { usePostWord } from '@/hooks/words/use-post-word.hook'
import { sharedWordFamily } from '@/recoil/shared-resource/shared-resource.state'
import { FC, useCallback, useState } from 'react'
import { useRecoilValue } from 'recoil'

interface Props {
  wordId: string
}
const SharedWordCardAddWordButtonPart: FC<Props> = ({ wordId }) => {
  const sharedWord = useRecoilValue(sharedWordFamily(wordId))
  const [loading, onPostWord] = usePostWord()
  const [isAdded, setAdded] = useState(false)

  const onClick = useCallback(async () => {
    try {
      if (!sharedWord) return
      if (!sharedWord.word) return

      await onPostWord({
        isFavorite: false,
        isArchived: false,
        term: sharedWord.word.term,
        pronunciation: sharedWord.word.pronunciation,
        definition: sharedWord.word.definition,
        example: sharedWord.word?.example,
        exampleLink: ``,
        tags: [],
      })

      // since it is added, it should be already added.
      setAdded(true)
    } catch {}
  }, [sharedWord, onPostWord])

  if (isAdded)
    return <StyledTextButtonAtom isDisabled title={`Already added`} />

  return (
    <StyledTextButtonAtom
      onClick={onClick}
      isLoading={loading}
      isDisabled={!sharedWord?.word}
      title={`Add this word into your list`}
    />
  )
}

export default SharedWordCardAddWordButtonPart
