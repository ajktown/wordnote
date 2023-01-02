import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import StyledDialog from '@/organisms/StyledDialog'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { FC } from 'react'
interface Props {
  onClickCancel?: () => any
  onClickConfirm?: () => any
  message?: string
}

const WordCardDialogCloseWarning: FC<Props> = ({
  message,
  onClickCancel,
  onClickConfirm,
}) => {
  return (
    <StyledDialog visuals={{ maxWidth: `xs` }} onClose={onClickCancel}>
      <DialogTitle>{`Are you sure?`}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
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

export default WordCardDialogCloseWarning
