import { FC, useCallback } from 'react'
import StyledDialog from '@/organisms/StyledDialog'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import WordCard from '.'
import { selectedWordForDialogState } from '@/recoil/words.state'
import { usePutWordCache } from '@/hooks/words/use-put-word-cache.hook'
import { useWarning } from '@/hooks/use-warning.hook'
import WarningDialog from '../organism_warning_dialog'

const WordCardDialog: FC = () => {
  const selectedWordId = useRecoilValue(selectedWordForDialogState)
  const handleCloseWordEditingDialog = useResetRecoilState(
    selectedWordForDialogState,
  )
  const [, handleResetCache, isModified] = usePutWordCache(selectedWordId)

  const handleCloseDialog = useCallback(async () => {
    await handleResetCache()
    handleCloseWordEditingDialog()
  }, [handleCloseWordEditingDialog, handleResetCache])

  const [
    isDialogOpen,
    handleClickOpenWarning,
    handleClickCloseWarning,
    handleClickConfirm,
  ] = useWarning(handleCloseDialog, isModified, { isReversed: true })

  if (!selectedWordId) return null

  return (
    <StyledDialog onClose={handleClickOpenWarning}>
      <WordCard wordId={selectedWordId} editingMode />
      {isDialogOpen && (
        <WarningDialog
          onClickConfirm={handleClickConfirm}
          onClickCancel={handleClickCloseWarning}
        />
      )}
    </StyledDialog>
  )
}

export default WordCardDialog
