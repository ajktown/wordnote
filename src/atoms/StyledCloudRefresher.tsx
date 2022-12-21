import { FC, useEffect, useCallback, useState, useMemo } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import WarningIcon from '@mui/icons-material/Warning'
import CloudDoneIcon from '@mui/icons-material/CloudDone'
import { runAfterHandler } from '@/handlers/run-after.handler'
import StyledIconButtonAtom from './StyledIconButton'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Fade } from '@mui/material'

enum LoadingStatus {
  Idle = 0,
  Loading = 1,
  Success = 2,
  Failed = -1,
}

const PRIVATE_FINAL_ICON_SIZE = `small`

// TODO: This does not yet have the cool design. So I need to create one!
// TODO: I have improved a bit, but it could be a cooler with taking the exact same space for all rendering!
// TODO: Gotta write this clean... too.
// TODO: Make this prolly business component..? (not sure yet)
interface Props {
  onClickCallback: () => any
  runOnClickCallbackOnce?: boolean // Default: false
}
const StyledCloudRefresher: FC<Props> = ({
  onClickCallback,
  runOnClickCallbackOnce,
}) => {
  const [loading, setLoading] = useState<LoadingStatus>(LoadingStatus.Idle)
  const showingTimeSecs = useMemo(
    () => (loading === LoadingStatus.Failed ? 5 : 2),
    [loading],
  )

  const internalHandleClick = useCallback(async () => {
    setLoading(LoadingStatus.Loading)
    try {
      await onClickCallback()
      runAfterHandler(() => setLoading(LoadingStatus.Success), showingTimeSecs)
    } catch {
      setLoading(LoadingStatus.Failed)
    } finally {
      runAfterHandler(() => setLoading(LoadingStatus.Idle), showingTimeSecs + 2)
    }
  }, [showingTimeSecs, onClickCallback])

  useEffect(() => {
    if (!runOnClickCallbackOnce) return
    internalHandleClick()
  }, [internalHandleClick, runOnClickCallbackOnce])

  switch (loading) {
    case LoadingStatus.Idle:
      return (
        <StyledIconButtonAtom
          onClickCallback={internalHandleClick}
          jsxElementButton={<RefreshIcon fontSize={PRIVATE_FINAL_ICON_SIZE} />}
          size={PRIVATE_FINAL_ICON_SIZE}
        />
      )
    case LoadingStatus.Loading:
      return <StyledCloudRefresherLoading />
    case LoadingStatus.Success:
      return <StyledCloudRefresherSuccess />
    default:
      return <WarningIcon fontSize={PRIVATE_FINAL_ICON_SIZE} /> // when failed
  }
}

const StyledCloudRefresherLoading: FC = () => {
  return <CircularProgress size={20} />
}

const StyledCloudRefresherSuccess: FC = () => {
  return (
    <Fade in appear>
      <CloudDoneIcon
        style={{ animation: `1s fadeIn` }}
        fontSize={PRIVATE_FINAL_ICON_SIZE}
      />
    </Fade>
  )
}

export default StyledCloudRefresher
