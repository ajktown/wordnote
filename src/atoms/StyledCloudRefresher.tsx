import { FC, useEffect, useCallback, useState, useMemo } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import WarningIcon from '@mui/icons-material/Warning'
import CloudDoneIcon from '@mui/icons-material/CloudDone'
import { runAfterHandler } from '@/handlers/run-after.handler'
import StyledIconButtonAtom from './StyledIconButton'
import RefreshIcon from '@mui/icons-material/Refresh'

enum LoadingStatus {
  Idle = 0,
  Loading = 1,
  Success = 2,
  Failed = -1,
}

// TODO: This does not yet have the cool design. So I need to create one!
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
      setLoading(LoadingStatus.Success)
    } catch {
      setLoading(LoadingStatus.Failed)
    } finally {
      runAfterHandler(() => setLoading(LoadingStatus.Idle), showingTimeSecs)
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
          jsxElementButton={<RefreshIcon />}
        />
      )
    case LoadingStatus.Loading:
      return <CircularProgress />
    case LoadingStatus.Success:
      return <CloudDoneIcon />
    default:
      return <WarningIcon /> // when failed
  }
}

export default StyledCloudRefresher
