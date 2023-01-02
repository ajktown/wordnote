import { FC, useCallback } from 'react'
import StyledDialog from '@/organisms/StyledDialog'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import WordCard from '.'
import { selectedWordForDialogState } from '@/recoil/words.state'
import { usePutWordCache } from '@/hooks/words/use-put-word-cache.hook'
import { useWarning } from '@/hooks/use-warning.hook'

const WordCardDialog: FC = () => {
  const selectedWordId = useRecoilValue(selectedWordForDialogState)
  const handleCloseWordEditingDialog = useResetRecoilState(
    selectedWordForDialogState,
  )
  const [, handleResetCache, isModified] = usePutWordCache(selectedWordId)
  const isWarningDisabled = useCallback(
    async () => !(await isModified()),
    [isModified],
  )

  const handleCloseDialog = useCallback(async () => {
    await handleResetCache()
    handleCloseWordEditingDialog()
  }, [handleCloseWordEditingDialog, handleResetCache])

  const [WarningDialog, handleClick] = useWarning(
    handleCloseDialog,
    isWarningDisabled,
    "It seems like there are some changes you have not saved on the cloud yet. Changes will be lost with confirmation."
  )

  if (!selectedWordId) return null

  return (
    <StyledDialog onClose={handleClick}>
      <WordCard wordId={selectedWordId} editingMode />
      {WarningDialog}
    </StyledDialog>
  )
}

export default WordCardDialog
