// Reset search input to undefined hook
import { useState } from 'react'
import { useRecoilCallback } from 'recoil'
import { useWordIds } from './use-word-ids.hook'
import { searchInputState } from '@/recoil/words/searchInput.state'

type HandleRefresh = () => Promise<void>
type UseResetSearchInput = [boolean, HandleRefresh]
export const useResetSearchInput = (): UseResetSearchInput => {
  const [loading, setLoading] = useState(false)
  const [, handleGetWordIds] = useWordIds()

  const handleRefresh: HandleRefresh = useRecoilCallback(
    ({ reset }) =>
      async () => {
        setLoading(true)
        try {
          await handleGetWordIds({ searchInput: undefined })
          reset(searchInputState)
        } finally {
          setLoading(false)
        }
      },
    [handleGetWordIds],
  )

  return [loading, handleRefresh]
}
