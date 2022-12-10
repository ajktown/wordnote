import { GlobalKeyboardEventKey } from '@/global.interface'
import { useEffect } from 'react'

export const useKeyPress = (
  keyName: GlobalKeyboardEventKey,
  onPressCallback: () => any,
) => {
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key !== keyName) return

      event.preventDefault()
      onPressCallback()
    }

    document.addEventListener(`keydown`, keyDownHandler)

    // Cleaning up the listener to prevent memory leak
    return () => {
      document.removeEventListener(`keydown`, keyDownHandler)
    }
  }, [keyName, onPressCallback])
}
