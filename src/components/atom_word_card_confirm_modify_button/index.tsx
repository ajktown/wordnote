import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { FC, useEffect } from 'react'
import { usePutWordCache } from '@/hooks/words/use-put-word-cache.hook'
import { usePutWordCacheByKey } from '@/hooks/words/use-put-word-cache-by-key.hook'
import { useKeyPress } from '@/hooks/use-key-press.hook'
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
  const [, , isExampleLinkModified] = usePutWordCacheByKey(
    wordId,
    `exampleLink`,
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === `Enter`) {
        handleApplyCache()
      }
    }
    document.addEventListener(`keydown`, handleKeyDown)
    return () => {
      document.removeEventListener(`keydown`, handleKeyDown)
    }
  })

  useKeyPress(handleApplyCache, `Meta`, `Enter`)
  useKeyPress(handleApplyCache, `Control`, `Enter`)

  if (
    !isTermModified &&
    !isPronunciationModified &&
    !isDefinitionModified &&
    !isExampleModified &&
    !isExampleLinkModified
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
