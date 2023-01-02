import { useCallback, useState } from 'react'

const PRIVATE_DEFAULT_IS_REVERSED = false
type UseWarning = [
  boolean, // isDialogOpen
  () => void, // handleClickOpenWarning
  () => any, // handleClickCloseWarning
  () => any, // handleClickConfirm
]
export const useWarning = (
  onClickConfirm: () => any,
  isWarningDisabled: () => Promise<boolean>,
  options?: {
    isReversed: boolean // Default: PRIVATE_DEFAULT_IS_REVERSED
  },
): UseWarning => {
  const [isDialogOpen, setDialog] = useState(false)
  const isReversed = options?.isReversed || PRIVATE_DEFAULT_IS_REVERSED

  const handleClickCloseWarning = useCallback(() => setDialog(false), [])
  const handleClickOpenWarning = useCallback(async () => {
    const isDisabled = await isWarningDisabled()
    if (isReversed && isDisabled) return setDialog(true)
    if (!isReversed && !isDisabled) return setDialog(true)
    await onClickConfirm()
  }, [isWarningDisabled, onClickConfirm, isReversed])

  const handleClickConfirm = useCallback(async () => {
    handleClickCloseWarning()
    await onClickConfirm()
  }, [handleClickCloseWarning, onClickConfirm])

  return [
    isDialogOpen,
    handleClickOpenWarning,
    handleClickCloseWarning,
    handleClickConfirm,
  ]
}
