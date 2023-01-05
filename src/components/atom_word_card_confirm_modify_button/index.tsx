import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { FC } from 'react'
import { usePutWordCache } from '@/hooks/words/use-put-word-cache.hook'
import { usePutWordCacheByKey } from '@/hooks/words/use-put-word-cache-by-key.hook'
interface Props {
  wordId: string
}

const WordCardConfirmModifyButton: FC<Props> = ({ wordId }) => {
  const [handleApplyCache] = usePutWordCache(wordId)

  const [, , isTermModified] = usePutWordCacheByKey(wordId, `term`)
  const [, , isPronunciationModified] = usePutWordCacheByKey(
    wordId,
    `pronunciation`,
  )
  const [, , isDefinitionModified] = usePutWordCacheByKey(wordId, `definition`)
  const [, , isExampleModified] = usePutWordCacheByKey(wordId, `example`)

  if (
    !isTermModified &&
    !isPronunciationModified &&
    !isDefinitionModified &&
    !isExampleModified
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
