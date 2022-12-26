import { useCallback, useState } from 'react'

type UseOnHover = [
  boolean, // isOnHover
  () => void, // handleMouseEnter
  () => void, // handleMouseLeave
]

export const useOnHover = (): UseOnHover => {
  const [isOnHover, setHover] = useState(false)

  const handleMouseEnter = useCallback(() => setHover(true), [])
  const handleMouseLeave = useCallback(() => setHover(false), [])

  return [isOnHover, handleMouseEnter, handleMouseLeave]
}
