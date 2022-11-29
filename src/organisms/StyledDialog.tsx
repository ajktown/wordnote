import { FC, ReactNode } from 'react'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import { Box, Stack, DialogTitle, Breakpoint } from '@mui/material'
import StyledTextButtonAtom, {
  StyledTextButtonProps,
} from '@/atoms/StyledTextButton'
import XButton from '@/components/atom_x_button'

const DRAGGABLE_TITLE_ID = `draggable-dialog-title`

export interface StyledDialogProps {
  fullScreen?: boolean
  opened?: boolean
  handleClose?: any
  title: string
  titleTypeRight?: string
  explain?: string
  maxWidth?: Breakpoint
  enableMinHeight?: boolean
  disableXButton?: boolean
  disableClosingOutside?: boolean // Disables closing dialog by clicking outside of the dialog
  TopLeftAlignment?: JSX.Element
  bottomRightStringButtons?: StyledTextButtonProps[]
  children?: ReactNode
  completelyBlurOut?: boolean // fault by default; Note: This will make the visual not visible at all.
}

const StyledDialog: FC<StyledDialogProps> = (props) => {
  const handleCloseInternally = () => {
    if (props.handleClose) props.handleClose()
  }

  return (
    <Dialog
      fullScreen={props.fullScreen}
      open={props.opened !== undefined ? props.opened : true}
      onClose={() => handleCloseInternally()}
      aria-labelledby={DRAGGABLE_TITLE_ID}
      aria-describedby="alert-dialog-description"
      maxWidth={props.maxWidth || `sm`}
      fullWidth
      style={{
        backdropFilter: props.completelyBlurOut ? `blur(18px)` : undefined,
      }}
    >
      <DialogTitle id={DRAGGABLE_TITLE_ID}>
        <Stack direction="row" alignItems="center" spacing={2}>
          {props.TopLeftAlignment}
          <Box sx={{ flexGrow: 1 }} />
          {props.disableXButton ? null : (
            <XButton
              handleClick={handleCloseInternally}
              hoverMessage={`Close`}
            />
          )}
        </Stack>
      </DialogTitle>
      <Box
        sx={{
          p: 4,
          pt: 0,
          minHeight: props.enableMinHeight ? `75vh` : undefined,
        }}
      >
        {props.children}
      </Box>
      {props.bottomRightStringButtons && (
        <DialogActions>
          {props.bottomRightStringButtons.map((eachButton, idx) => (
            <StyledTextButtonAtom key={idx} variant="text" {...eachButton} />
          ))}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default StyledDialog
