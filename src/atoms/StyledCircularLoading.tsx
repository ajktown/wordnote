import { FC } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { Box } from '@mui/material'

type PrivateSize =
  | 20 // small
  | 40 // medium
  | 60 // large

const PRIVATE_DEFAULT_SIZE: PrivateSize = 20
interface Props {
  size?: PrivateSize // PRIVATE_DEFAULT_SIZE
}
const StyledCircularLoading: FC<Props> = ({ size }) => {
  return (
    <Box sx={{ display: `flex` }}>
      <CircularProgress size={size || PRIVATE_DEFAULT_SIZE} />
    </Box>
  )
}

export default StyledCircularLoading
