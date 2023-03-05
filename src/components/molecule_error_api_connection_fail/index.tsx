import StyledSnackbarMolecule from '@/molecules/StyledSnackbar'
import { isApiConnectFailed } from '@/recoil/apis/error-api-connection-fail.state'
import { FC } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'

const ErrorApiConnectionFail: FC = () => {
  const isFailed = useRecoilValue(isApiConnectFailed)
  const resetFailed = useResetRecoilState(isApiConnectFailed)

  return (
    <StyledSnackbarMolecule
      message="Connection error to the server. Please try after some time."
      severity={isFailed ? `error` : null}
      handleClose={resetFailed}
    />
  )
}

export default ErrorApiConnectionFail
