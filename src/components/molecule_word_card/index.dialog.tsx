import { FC, useCallback } from 'react'
import StyledDialog from '@/organisms/StyledDialog'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import WordCard from '.'
import { selectedWordIdForDialogState } from '@/recoil/words.state'
import { usePutWordCache } from '@/hooks/words/use-put-word-cache.hook'
import { useWarning } from '@/hooks/use-warning.hook'
import WordCardDialogCloseWarning from './index.dialog.close_warning'

const WordCardDialog: FC = () => {
  const selectedWordId = useRecoilValue(selectedWordIdForDialogState)
  const onCloseWordEditingDialog = useResetRecoilState(
    selectedWordIdForDialogState,
  )
  const [, handleResetCache, isModified] = usePutWordCache(selectedWordId)

  const handleCloseDialog = useCallback(async () => {
    await handleResetCache()
    onCloseWordEditingDialog()
  }, [onCloseWordEditingDialog, handleResetCache])

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
        <WordCardDialogCloseWarning
          onClickConfirm={handleClickConfirm}
          onClickCancel={handleClickCloseWarning}
        />
      )}
    </StyledDialog>
  )
}

export default WordCardDialog
