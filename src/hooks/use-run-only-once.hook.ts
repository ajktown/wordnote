import { useEffect, useState } from 'react'

export const useRunOnlyOnce = (
  onRun: () => any,
  runOnlyOnce?: boolean,
): void => {
  const [executed, setExecuted] = useState(false)

  useEffect(() => {
    if (!runOnlyOnce || executed) return
    setExecuted(true)
    onRun()
  }, [onRun, executed, runOnlyOnce])
}
