import { FC } from 'react'
import StyledIconButtonPin from '@/atoms/StyledIconButtonPin'
import { usePutWordIsPinned } from '@/hooks/words/use-put-word-is-pinned.hook'

interface Props {
  wordId: string
}

const WordCardPinButtonPart: FC<Props> = ({ wordId }) => {
  const [word, onPutWordIsPinned] = usePutWordIsPinned(wordId)

  if (!word) return null

  return (
    <StyledIconButtonPin
      isClicked={word.isPinned}
      onClick={onPutWordIsPinned}
    />
  )
}

export default WordCardPinButtonPart
