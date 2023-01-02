import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import StyledDialog from '@/organisms/StyledDialog'
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { FC } from 'react'
interface Props {
  open: boolean
  message?: string
  onClickCancel?: () => any
  onClickConfirm?: () => any
}

const WarningDialog: FC<Props> = ({ open, message, onClickCancel, onClickConfirm }) => {
  if (!open) return null

  return (
    <StyledDialog visuals={{ maxWidth: `xs` }}>
      <DialogTitle>{`Are you sure?`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <StyledTextButtonAtom
          variant="text"
          title="Cancel"
          onClick={onClickCancel}
        />
        <StyledTextButtonAtom
          variant="text"
          title="Confirm"
          onClick={onClickConfirm}
        />
      </DialogActions>
    </StyledDialog>
  )
}

export default WarningDialog
