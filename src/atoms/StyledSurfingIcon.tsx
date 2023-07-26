import { FC, useCallback, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import WarningIcon from '@mui/icons-material/Warning'
import CloudDoneIcon from '@mui/icons-material/CloudDone'
import { runAfterHandler } from '@/handlers/run-after.handler'
import StyledIconButtonAtom from './StyledIconButton'
import SurfingIcon from '@mui/icons-material/Surfing'
import { Fade } from '@mui/material'
import { GlobalMuiFontSize } from '@/global.interface'
import { useRunOnlyOnce } from '@/hooks/use-run-only-once.hook'

enum PrivateLoadingStatus {
  Idle = 0,
  Loading = 1,
  Success = 2,
  Failed = -1,
}

const PRIVATE_FINAL_ICON_SIZE: GlobalMuiFontSize = `small`
const PRIVATE_SUCCESS_ICON_SECS = 2
const PRIVATE_FAILURE_ICON_SECS = 5

const StyledCloudRefresherBody: FC<{ loading: PrivateLoadingStatus }> = ({
  loading,
}) => {
  switch (loading) {
    case PrivateLoadingStatus.Idle:
      return < SurfingIcon fontSize={PRIVATE_FINAL_ICON_SIZE} />
    case PrivateLoadingStatus.Loading:
      return <CircularProgress size={20} />
    case PrivateLoadingStatus.Success:
      return (
        <Fade in appear>
          <CloudDoneIcon
            style={{ animation: `1s fadeIn` }}
            fontSize={PRIVATE_FINAL_ICON_SIZE}
          />
        </Fade>
      )
    default:
      return <WarningIcon fontSize={PRIVATE_FINAL_ICON_SIZE} /> // when failed
  }
}

interface Props {
  onClick: () => any
  runOnClickOnce?: boolean // Default: false
}
const StyledCloudRefresher: FC<Props> = ({ onClick, runOnClickOnce }) => {
  const [loading, setLoading] = useState<PrivateLoadingStatus>(
    PrivateLoadingStatus.Idle,
  )

  const handleClick = useCallback(async () => {
    setLoading(PrivateLoadingStatus.Loading)
    try {
      await onClick()
      setLoading(PrivateLoadingStatus.Success)
      runAfterHandler(
        () => setLoading(PrivateLoadingStatus.Idle),
        PRIVATE_SUCCESS_ICON_SECS,
      )
    } catch {
      setLoading(PrivateLoadingStatus.Failed)
      runAfterHandler(
        () => setLoading(PrivateLoadingStatus.Idle),
        PRIVATE_FAILURE_ICON_SECS,
      )
    }
  }, [onClick])

  useRunOnlyOnce(handleClick, runOnClickOnce)

  return (
    <StyledIconButtonAtom
      onClick={handleClick}
      isDisabled={loading !== PrivateLoadingStatus.Idle}
      jsxElementButton={<StyledCloudRefresherBody loading={loading} />}
      size={PRIVATE_FINAL_ICON_SIZE}
    />
  )
}

export default StyledCloudRefresher
