import { GlobalKeyboardEventKey } from '@/global.interface'
import { useEffect } from 'react'

// TODO: This will eventually have multiple keys pushed, or it will have a separate file for such.
export const useKeyPress = (
  onKeyPress: () => any,
  ...keyNames: GlobalKeyboardEventKey[]
) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.isComposing ||
        !keyNames.includes(event.key as GlobalKeyboardEventKey)
      )
        return

      event.preventDefault()
      onKeyPress()
    }

    document.addEventListener(`keydown`, onKeyDown)

    // Cleaning up the listener to prevent memory leak
    return () => {
      document.removeEventListener(`keydown`, onKeyDown)
    }
  }, [onKeyPress, keyNames])
}
