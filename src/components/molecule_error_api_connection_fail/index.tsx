import StyledSnackbarMolecule from '@/molecules/StyledSnackbar'
import { FC, useCallback } from 'react'

const ErrorApiConnectionFail: FC = () => {
  const onClickCloseSnackbar = useCallback(() => {}, [])
  return (
    <StyledSnackbarMolecule
      message="Connection error to the server. Please try after some time."
      severity={`info`}
      handleClose={onClickCloseSnackbar}
    />
  )
}

export default ErrorApiConnectionFail
