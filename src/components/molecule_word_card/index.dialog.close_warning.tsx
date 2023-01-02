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
}

const WordCardDialogCloseWarning: FC<Props> = ({
  onClickCancel,
  onClickConfirm,
}) => {
  return (
    <StyledDialog visuals={{ maxWidth: `xs` }} onClose={onClickCancel}>
      <DialogTitle>{`Discard changes you made?`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Changes you made will be discarded.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <StyledTextButtonAtom
          variant="text"
          title="Cancel"
          onClick={onClickCancel}
        />
        <StyledTextButtonAtom
          variant="contained"
          title="Yes, Discard it."
          color="error"
          onClick={onClickConfirm}
        />
      </DialogActions>
    </StyledDialog>
  )
}

export default WordCardDialogCloseWarning
