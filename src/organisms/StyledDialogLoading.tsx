import { FC } from 'react'
import StyledDialog, { StyledDialogProps } from './StyledDialog'
import { CircularProgress, Box } from '@mui/material'

type Props = Omit<StyledDialogProps, 'children'>
/**
 * Simply returns the centered CircularProgress
 */
const StyledDialogLoading: FC<Props> = (props) => {
  return (
    <StyledDialog {...props}>
      <Box
        style={{
          display: `flex`,
          justifyContent: `center`,
          alignItems: `center`,
        }}
        m={10}
      >
        <CircularProgress color="inherit" />
      </Box>
    </StyledDialog>
  )
}

export default StyledDialogLoading
