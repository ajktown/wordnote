import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import StyledDialog from '@/organisms/StyledDialog'
import { Typography } from '@mui/material'
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
    <StyledDialog>
      <Typography>{`Are you sure?`}</Typography>
      <StyledTextButtonAtom title="Cancel" onClick={onClickCancel} />
      <StyledTextButtonAtom title="Confirm" onClick={onClickConfirm} />
    </StyledDialog>
  )
}

export default WarningDialog
