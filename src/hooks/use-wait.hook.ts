import { useCallback, useEffect, useRef, useState } from 'react'

/** Runs the given onRun() after given waitSeconds later. This hook is useful
 * When you want to wait for a while before running the onRun() function,
 * to reduce unnecessary lagging and to prevent unnecessary calls, like search inputs.
 */
export const useWait = (
  onRun: any, // Make sure it is useCallback function, and should act as a change to trigger the wait.
  waitSeconds: number,
): boolean => {
  const [loading, setLoading] = useState(false)
  const timerID = useRef<NodeJS.Timeout | null>(null)

  const onActualCall = useCallback(async () => {
    await onRun()
    setLoading(false)
  }, [onRun])

  const clearTimer = useCallback(() => {
    if (timerID.current) {
      clearTimeout(timerID.current)
      timerID.current = null
    }
  }, [timerID])

  useEffect(() => {
    setLoading(true)
    clearTimer()
    timerID.current = setTimeout(onActualCall, 1000 * waitSeconds) // set new timeout
    return clearTimer // clear timeout on cleanup
  }, [onActualCall, waitSeconds, clearTimer])

  return loading
}
