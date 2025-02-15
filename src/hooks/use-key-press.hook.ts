import { GlobalKeyboardEventKey } from '@/global.interface'
import { useEffect } from 'react'

export const useKeyPress = (
  onKeyPress: () => any,
  firstKey: GlobalKeyboardEventKey,
  secondKey?: GlobalKeyboardEventKey,
) => {
  useEffect(() => {
    const keysPressed = new Set<string>() // command, enter

    const onKeyDown = (event: KeyboardEvent) => {
      // to not run onKeyPress() during composing (especially Japanese or Chinese where character conversion is required)
      if (event.isComposing) return

      keysPressed.add(event.key)

      // TODO: Check the length too here:
      // if (secondKey === undefined && keysPressed.size !== 1) return
      // if (secondKey !== undefined && keysPressed.size !== 2) return

      if (!keysPressed.has(firstKey)) return // first key is not pressed
      if (secondKey !== undefined && !keysPressed.has(secondKey)) return // second key must be pressed but not so

      event.preventDefault()
      onKeyPress()
    }

    const onKeyUp = () => {
      // instead of deleting a specific key like keysPressed.delete(event.key), we need to clear all keys
      // as any press up will be considered "not pressed" for the next key press
      keysPressed.clear()
    }

    document.addEventListener(`keydown`, onKeyDown)
    document.addEventListener(`keyup`, onKeyUp)

    // Cleaning up the listeners to prevent memory leak
    return () => {
      document.removeEventListener(`keydown`, onKeyDown)
      document.removeEventListener(`keyup`, onKeyUp)
    }
  }, [onKeyPress, firstKey, secondKey])
}
