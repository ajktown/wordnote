import { useCallback, useState } from 'react'

type UseOnHover = [
  boolean, // isOnHover
  () => void, // handleMouseEnter
  () => void, // handleMouseLeave
]

export const useOnHover = (): UseOnHover => {
  const [isOnHover, setHover] = useState(false)

  const onMouseEnter = useCallback(() => setHover(true), [])
  const onMouseLeave = useCallback(() => setHover(false), [])

  return [isOnHover, onMouseEnter, onMouseLeave]
}
