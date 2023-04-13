import { useCallback } from 'react'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import { deprecatedIsFavoriteClickedState } from '@/recoil/words/favorites.state'
import { deprecatedSelectedSemesterState } from '@/recoil/words/semesters.state'
import { selectedCustomizedTagsState } from '@/recoil/words/tags.state'

// TODO: Yuk, this is a mess. I need to refactor this.
export const useResetSelectedChips = (code?: number) => {
  const setSelectedSemester = useSetRecoilState(deprecatedSelectedSemesterState)
  const onResetSelectedSemester = useResetRecoilState(
    deprecatedSelectedSemesterState,
  )
  const onResetFavoriteClicked = useResetRecoilState(
    deprecatedIsFavoriteClickedState,
  )
  const onResetSelectedTagsState = useResetRecoilState(
    selectedCustomizedTagsState,
  )

  const onClick = useCallback(() => {
    code ? setSelectedSemester(code) : onResetSelectedSemester()
    onResetFavoriteClicked()
    onResetSelectedTagsState()
  }, [
    code,
    setSelectedSemester,
    onResetSelectedSemester,
    onResetFavoriteClicked,
    onResetSelectedTagsState,
  ])

  return onClick
}
