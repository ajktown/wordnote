import { GlobalKeyboardEventKey } from '@/global.interface'
import { useEffect } from 'react'

// TODO: This will eventually have multiple keys pushed, or it will have a separate file for such.
export const useKeyPress = (
  keyName: GlobalKeyboardEventKey,
  onPress: () => any,
) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== keyName) return

      event.preventDefault()
      onPress()
    }

    document.addEventListener(`keydown`, onKeyDown)

    // Cleaning up the listener to prevent memory leak
    return () => {
      document.removeEventListener(`keydown`, onKeyDown)
    }
  }, [keyName, onPress])
}
