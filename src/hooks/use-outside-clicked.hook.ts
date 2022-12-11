import { useRef, useEffect, MutableRefObject } from 'react'

type UseOutsideClickedData = HTMLDivElement | null

/**
 *
 * @param handleClickAddCallback
 *
 * @returns Reference
 * Returned reference should be applied to the React component
 * i.e) <Component ref={ref} ><ComponentChild /><Component>
 */

export const useOutsideClicked = (
  handleClickAddCallback?: () => void,
): MutableRefObject<UseOutsideClickedData> => {
  const reference = useRef<UseOutsideClickedData>(null)

  useEffect(() => {
    if (handleClickAddCallback === undefined) return

    const handleClickOutside = (event: any) => {
      // Runs the handleClickAddCallback(), if fits.
      if (reference.current && !reference.current.contains(event.target)) {
        handleClickAddCallback()
      }
    }
    // Bind the event listener
    document.addEventListener(`mousedown`, handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener(`mousedown`, handleClickOutside)
    }
  }, [reference, handleClickAddCallback])

  return reference
}
