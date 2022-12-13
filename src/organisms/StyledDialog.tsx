import { FC, ReactNode, useCallback } from 'react'
import Dialog from '@mui/material/Dialog'
import {  Breakpoint } from '@mui/material'

const PRIVATE_DEFAULT_FINAL_MAX_WIDTH: Breakpoint = "sm"
const PRIVATE_DEFAULT_BLUR_OUT_PIXELS: number = 18 // higher, the blurrier it gets

export interface StyledDialogProps {
  children: ReactNode
  handleCloseCallback?: any // If given, it will allow you to close outside.
  visuals?: {
    maxWidth?: Breakpoint // Default: PRIVATE_DEFAULT_FINAL_MAX_WIDTH
    fullScreen?: boolean // Default: false
    completelyBlurOut?: boolean // Default: false
  }
}

const StyledDialog: FC<StyledDialogProps> = ({handleCloseCallback, ...props}) => {
  const handleCloseInternally = useCallback(() => {
    if (!handleCloseCallback) return
    handleCloseCallback()
  }, [handleCloseCallback])

  return (
    <Dialog
      open
      onClose={() => handleCloseInternally()}
      maxWidth={props.visuals?.maxWidth || PRIVATE_DEFAULT_FINAL_MAX_WIDTH}
      fullWidth
      style={{
        backdropFilter: props.visuals?.completelyBlurOut ? `blur(${PRIVATE_DEFAULT_BLUR_OUT_PIXELS}px)` : undefined,
      }}
      fullScreen={props.visuals?.fullScreen}
    >
      {props.children}
    </Dialog>
  )
}

export default StyledDialog
