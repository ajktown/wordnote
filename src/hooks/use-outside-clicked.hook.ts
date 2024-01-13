import { useRef, useEffect, MutableRefObject } from 'react'

type UseOutsideClickedData = HTMLDivElement | null

/**
 *
 * @param handleClick
 *
 * @returns Reference
 * Returned reference should be applied to the React component
 * i.e) <Component ref={ref} ><ComponentChild /><Component>
 */

export const useOutsideClicked = (
  handleClick?: () => any,
): MutableRefObject<UseOutsideClickedData> => {
  const reference = useRef<UseOutsideClickedData>(null)

  useEffect(() => {
    if (!handleClick) return

    const onClickOutside = (event: any) => {
      // TODO: You may put the event type here.
      // Runs the onClickAdd(), if fits.
      if (reference.current && !reference.current.contains(event.target)) {
        handleClick()
      }
    }
    // Bind the event listener
    document.addEventListener(`mousedown`, onClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener(`mousedown`, onClickOutside)
    }
  }, [reference, handleClick])

  return reference
}
