import { useRef, useEffect, MutableRefObject } from 'react'

type UseOutsideClickedData = HTMLDivElement | null

/**
 *
 * @param onClickAdd
 *
 * @returns Reference
 * Returned reference should be applied to the React component
 * i.e) <Component ref={ref} ><ComponentChild /><Component>
 */

export const useOutsideClicked = (
  onClickAdd?: () => void,
): MutableRefObject<UseOutsideClickedData> => {
  const reference = useRef<UseOutsideClickedData>(null)

  useEffect(() => {
    if (onClickAdd === undefined) return

    const handleClickOutside = (event: any) => {
      // Runs the onClickAdd(), if fits.
      if (reference.current && !reference.current.contains(event.target)) {
        onClickAdd()
      }
    }
    // Bind the event listener
    document.addEventListener(`mousedown`, handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener(`mousedown`, handleClickOutside)
    }
  }, [reference, onClickAdd])

  return reference
}
