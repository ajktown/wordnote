import { FC, useCallback, useEffect, useState } from 'react'
import { Typography } from '@mui/material'

interface Props {
  targetTime: number | null // JS valueOf() time.
}
/**
 * StyledCountdownTimer is a component that shows the time left until the target time.
 */
// TODO: make the design better.
const StyledCountdownTimer: FC<Props> = ({ targetTime }) => {
  const calculateTimeLeft = useCallback(() => {
    if (targetTime === null) return 0 // expired

    const difference = +new Date(targetTime) - +new Date()
    return Math.max(Math.floor(difference / 1000), 0)
  }, [targetTime])
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(interval)
  }, [calculateTimeLeft])

  if (timeLeft === 0) return <Typography>{`Time Left: Expired`}</Typography>
  return <Typography>{`Time Left: ${timeLeft}`}</Typography>
}

export default StyledCountdownTimer
