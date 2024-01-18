// Reset search input to undefined hook
import { useState } from 'react'
import { useRecoilCallback } from 'recoil'
import { searchInputState } from '@/recoil/words/searchInput.state'
import { useWords } from './use-words.hook'

type HandleRefresh = () => Promise<void>
type UseResetSearchInput = [boolean, HandleRefresh]
export const useResetSearchInput = (): UseResetSearchInput => {
  const [loading, setLoading] = useState(false)
  const [, onGetWords] = useWords()

  const onResetSearchInput: HandleRefresh = useRecoilCallback(
    ({ reset }) =>
      async () => {
        setLoading(true)
        try {
          await onGetWords({ searchInput: undefined })
          reset(searchInputState)
        } finally {
          setLoading(false)
        }
      },
    [onGetWords],
  )

  return [loading, onResetSearchInput]
}
