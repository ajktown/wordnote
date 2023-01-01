import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { FC, useCallback } from 'react'
import { usePutWordCache } from '@/hooks/words/use-put-word-cache.hook'
interface Props {
  wordId: string
}

const WordCardConfirmModifyButton: FC<Props> = ({ wordId }) => {
  const [handleChange] = usePutWordCache(wordId)

  const handleClickChange = useCallback(async () => {
    await handleChange()
  }, [handleChange])

  return (
    <StyledTextButtonAtom
      title="Modify"
      variant="text"
      onClick={handleClickChange}
    />
  )
}

export default WordCardConfirmModifyButton
