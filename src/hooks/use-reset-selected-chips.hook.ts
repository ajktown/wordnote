import { useCallback } from 'react'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import { isFavoriteClickedState } from '@/recoil/favorites.state'
import { selectedLanguageState } from '@/recoil/languages.state'
import { selectedSemesterState } from '@/recoil/semesters.state'
import { selectedCustomizedTagsState } from '@/recoil/tags.state'
import { selectedCreatedDayState } from '@/recoil/words/created-date-tags.state'

export const useResetSelectedChips = (code?: number) => {
  const setSelectedSemester = useSetRecoilState(selectedSemesterState)
  const onResetSelectedSemester = useResetRecoilState(selectedSemesterState)
  const onResetFavoriteClicked = useResetRecoilState(isFavoriteClickedState)
  const onResetSelectedLanguage = useResetRecoilState(selectedLanguageState)
  const onResetSelectedTagsState = useResetRecoilState(
    selectedCustomizedTagsState,
  )
  const onResetSelectedCustomizedTags = useResetRecoilState(
    selectedCreatedDayState,
  )

  const onClick = useCallback(() => {
    code ? setSelectedSemester(code) : onResetSelectedSemester()
    onResetFavoriteClicked()
    onResetSelectedLanguage()
    onResetSelectedTagsState()
    onResetSelectedCustomizedTags()
  }, [
    code,
    setSelectedSemester,
    onResetSelectedSemester,
    onResetFavoriteClicked,
    onResetSelectedLanguage,
    onResetSelectedTagsState,
    onResetSelectedCustomizedTags,
  ])

  return onClick
}
