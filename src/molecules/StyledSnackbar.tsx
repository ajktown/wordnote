import { FC, JSX } from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertColor } from '@mui/material/Alert'

const DEFAULT_AUTO_CLOSE_SECS = 6

type PrivateSeverity =
  | null // Snackbar is considered closed
  | undefined // Default theme for the snackbar, grey background
  | AlertColor

interface Props {
  message: JSX.Element | string
  severity: PrivateSeverity
  handleClose: () => any
}

const StyledSnackbarMolecule: FC<Props> = ({
  message,
  severity,
  handleClose,
}) => {
  if (severity === null) return null

  return (
    <Stack spacing={2} sx={{ width: `100%` }}>
      <Snackbar
        open={true}
        autoHideDuration={DEFAULT_AUTO_CLOSE_SECS * 1000}
        onClose={handleClose}
      >
        <MuiAlert
          onClose={handleClose}
          elevation={6}
          variant="filled"
          severity={severity}
          sx={{
            width: `100%`,
          }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </Stack>
  )
}

export default StyledSnackbarMolecule
