import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { FC } from 'react'
import { usePutWordCache } from '@/hooks/words/use-put-word-cache.hook'
import { useRecoilValue } from 'recoil'
import { modifyingWordFamily, wordsFamily } from '@/recoil/words.state'
interface Props {
  wordId: string
}

const WordCardConfirmModifyButton: FC<Props> = ({ wordId }) => {
  const [handleApplyCache] = usePutWordCache(wordId)
  const word = useRecoilValue(wordsFamily(wordId))
  const term = useRecoilValue(modifyingWordFamily(`term`))
  const pronunciation = useRecoilValue(modifyingWordFamily(`pronunciation`))
  const definition = useRecoilValue(modifyingWordFamily(`definition`))
  const example = useRecoilValue(modifyingWordFamily(`example`))

  if (word === null) return null

  if (
    (term === null || word.term === term) &&
    (pronunciation === null || word.pronunciation === pronunciation) &&
    (definition === null || word.definition === definition) &&
    (example === null || word.example === example)
  )
    return null

  return (
    <StyledTextButtonAtom
      title="Modify"
      variant="text"
      onClick={handleApplyCache}
    />
  )
}

export default WordCardConfirmModifyButton
