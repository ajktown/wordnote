import { useCallback, useState, Dispatch, SetStateAction } from "react"

export type HandleClickRefresh = Dispatch<SetStateAction<boolean>>

export const useInternalLoading = (): [
  boolean,
  HandleClickRefresh
] => {
  const [internalLoading, setInternalLoading] = useState(true)

  const handleClickRefresh = useCallback(
    () => setInternalLoading(!internalLoading),
    [internalLoading],
  )

  return [internalLoading, handleClickRefresh]
}