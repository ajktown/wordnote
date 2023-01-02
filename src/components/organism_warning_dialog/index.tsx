import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import StyledDialog from '@/organisms/StyledDialog'
import { DialogActions, DialogTitle } from '@mui/material'
import { FC } from 'react'

interface Props {
  open: boolean
  onClickCancel?: () => any
  onClickConfirm?: () => any
}
// TODO: Design this component
const WarningDialog: FC<Props> = ({ open, onClickCancel, onClickConfirm }) => {
  if (!open) return null

  return (
    <StyledDialog visuals={{ maxWidth: "xs" }}>
      <DialogTitle>
        {`Are you sure?`}
      </DialogTitle>
      <DialogActions>
        <StyledTextButtonAtom variant="text" title="Cancel" onClick={onClickCancel} />
        <StyledTextButtonAtom variant="text" title="Confirm" onClick={onClickConfirm} />
      </DialogActions>
    </StyledDialog>
  )
}

export default WarningDialog
