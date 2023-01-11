import { useEffect } from 'react'

export const useRunOnlyOnce = (
  onRun: () => any,
  runOnlyOnce?: boolean,
): void => {
  useEffect(() => {
    runOnlyOnce && onRun()
  }, [onRun, runOnlyOnce])
}
