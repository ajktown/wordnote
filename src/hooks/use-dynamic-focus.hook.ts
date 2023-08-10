import { RefObject, useCallback, useRef } from 'react'

type UseDynamicFocus = [RefObject<HTMLInputElement>, () => Promise<any>]
/** Returns ReactRef & onClick function
 *   ref: Will be used to set focus to the given ref.
 *   onClick: Will run the given handleClick() function, and then set focus to the given ref.
 */
export const useDynamicFocus = (
  handleClick: () => Promise<any>,
  // Optional: If you want to wait before setting focus.
  // Why do we need this? Because if you set focus immediately after a click, the focus will be possibly lost
  // possibly due to disabled items, or other reasons.
  milliSecondsWait = 50,
): UseDynamicFocus => {
  const ref = useRef<HTMLInputElement>(null)

  const setFocus = useCallback(() => {
    if (!ref.current) return
    setTimeout(() => {
      if (ref.current) ref.current.focus()
    }, milliSecondsWait)
  }, [ref, milliSecondsWait])

  const onClick = useCallback(async () => {
    await handleClick()
    setFocus()
  }, [handleClick, setFocus])

  return [ref, onClick]
}
