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
  // TODO: isWarningDisabled should be boolean, not the function that returns boolean. isReversed should be removed too.
  options?: {
    isReversed: boolean // Default: PRIVATE_DEFAULT_IS_REVERSED
  },
): UseWarning => {
  const [isDialogOpen, setDialog] = useState(false)
  const isReversed = options?.isReversed || PRIVATE_DEFAULT_IS_REVERSED

  const handleClickCloseWarning = useCallback(() => setDialog(false), [])
  const handleClickOpenWarning = useCallback(async () => {
    const isDisabled = isReversed
      ? await isWarningDisabled()
      : !(await isWarningDisabled())
    if (isDisabled) return setDialog(true)

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
