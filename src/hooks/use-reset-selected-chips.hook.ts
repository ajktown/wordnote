import { useCallback } from 'react'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import { isFavoriteClickedState } from '@/recoil/favorites.state'
import { selectedLanguageState } from '@/recoil/languages.state'
import { selectedSemesterState } from '@/recoil/semesters.state'
import { selectedCustomizedTagsState } from '@/recoil/tags.state'

export const useResetSelectedChips = (code?: number) => {
  const setSelectedSemester = useSetRecoilState(selectedSemesterState)
  const onResetSelectedSemester = useResetRecoilState(selectedSemesterState)
  const onResetFavoriteClicked = useResetRecoilState(isFavoriteClickedState)
  const onResetSelectedLanguage = useResetRecoilState(selectedLanguageState)
  const onResetSelectedTagsState = useResetRecoilState(
    selectedCustomizedTagsState,
  )
  // TODO: Add new reset for created ago chips
  const onClick = useCallback(() => {
    code ? setSelectedSemester(code) : onResetSelectedSemester()
    onResetFavoriteClicked()
    onResetSelectedLanguage()
    onResetSelectedTagsState()
  }, [
    code,
    setSelectedSemester,
    onResetSelectedSemester,
    onResetFavoriteClicked,
    onResetSelectedLanguage,
    onResetSelectedTagsState,
  ])

  return onClick
}
