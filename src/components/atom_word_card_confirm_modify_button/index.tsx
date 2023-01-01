import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { FC, useCallback } from 'react'
import { useResetRecoilState } from 'recoil'
import { selectedWordForDialogState } from '@/recoil/words.state'
import { usePutWordCache } from '@/hooks/words/use-put-word-cache.hook'
interface Props {
  wordId: string
}

const WordCardConfirmModifyButton: FC<Props> = ({ wordId }) => {
  const [handleChange] = usePutWordCache(wordId)
  const resetDialog = useResetRecoilState(selectedWordForDialogState)

  const handleClickChange = useCallback(async () => {
    await handleChange()
    resetDialog()
  }, [handleChange, resetDialog])

  return (
    <StyledTextButtonAtom
      title="Modify"
      variant="text"
      onClick={handleClickChange}
    />
  )
}

export default WordCardConfirmModifyButton
