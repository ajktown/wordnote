import { useCallback } from 'react'

export const useOnClickNewTab = (link: string) => {
  const onClick = useCallback(() => {
    const win = window.open(link, `_blank`)
    if (win) win.focus()
  }, [link])

  return onClick
}
