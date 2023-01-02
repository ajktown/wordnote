import WarningDialog from '@/components/organism_warning_dialog'
import { ReactNode, useCallback, useState } from 'react'

type UseWarning = [
  ReactNode,
  () => void, // handleClickOpenWarningDialog
]
export const useWarning = (
  onClickConfirm: () => any,
  isWarningDisabled: () => Promise<boolean>,
): UseWarning => {
  const [isDialogOpen, setDialog] = useState(false)

  const handleCloseWarningDialog = useCallback(() => setDialog(false), [])

  const handleClickOpenWarningDialog = useCallback(async () => {
    if (!(await isWarningDisabled())) return setDialog(true)
    await onClickConfirm()
  }, [isWarningDisabled, onClickConfirm])

  const handleClickConfirm = useCallback(async () => {
    handleCloseWarningDialog()
    await onClickConfirm()
  }, [handleCloseWarningDialog, onClickConfirm])

  return [
    <WarningDialog
      open={isDialogOpen}
      key="warning_dialog"
      message={"It seems like there are some changes you have not confirmed yet."}
      onClickCancel={handleCloseWarningDialog}
      onClickConfirm={handleClickConfirm}
    />,
    handleClickOpenWarningDialog,
  ]
}
