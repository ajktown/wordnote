import { Backdrop, CircularProgress } from '@mui/material'
import { FC } from 'react'

const PRIVATE_DEFAULT_IS_OPEN = true
interface Props {
  open?: boolean // PRIVATE_DEFAULT_IS_OPEN
}
const StyledBackdrop: FC<Props> = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: `#fff`, zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open || PRIVATE_DEFAULT_IS_OPEN}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default StyledBackdrop
