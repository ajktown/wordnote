import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { FC } from 'react'
import { usePutWordCache } from '@/hooks/words/use-put-word-cache.hook'
interface Props {
  wordId: string
}

const WordCardConfirmModifyButton: FC<Props> = ({ wordId }) => {
  const [handleApplyCache, ] = usePutWordCache(wordId)

  return (
    <StyledTextButtonAtom
      title="Modify"
      variant="text"
      onClick={handleApplyCache}
    />
  )
}

export default WordCardConfirmModifyButton
