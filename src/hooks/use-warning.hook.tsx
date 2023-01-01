import WarningDialog from '@/components/organism_warning_dialog'
import { ReactNode, useCallback, useState } from 'react'

type UseWarning = [ReactNode, () => void]
export const useWarning = (onRun: () => any): UseWarning => {
  const [isDialogOpen, setDialog] = useState(false)

  const openDialog = useCallback(() => setDialog(true), [])
  const closeDialog = useCallback(() => setDialog(false), [])

  return [
    <WarningDialog
      open={isDialogOpen}
      key="warning_dialog"
      onClickCancel={closeDialog}
      onClickConfirm={onRun}
    />,
    openDialog,
  ]
}
