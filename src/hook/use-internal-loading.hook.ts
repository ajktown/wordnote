import { useCallback, useState } from "react"

export type HandleClickRefresh = () => void

export const useInternalLoading = (): [
  boolean,
  HandleClickRefresh
] => {
  const [internalLoading, setInternalLoading] = useState(true)

  const handleClickRefresh: HandleClickRefresh = useCallback(
    () => setInternalLoading(!internalLoading),
    [internalLoading],
  )

  return [internalLoading, handleClickRefresh]
}