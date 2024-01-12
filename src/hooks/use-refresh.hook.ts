import { useCallback, useState } from 'react'

export type HandleRefresh = () => void
type UseHookRefresh = [
  boolean, // internalFlag
  HandleRefresh,
]

export const useHookRefresh = (): UseHookRefresh => {
  const [internalFlag, setInternalFlag] = useState(false)

  const onHookRefresh = useCallback(() => {
    setInternalFlag(!internalFlag)
  }, [internalFlag])

  return [internalFlag, onHookRefresh]
}
