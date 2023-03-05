import { useCallback } from 'react'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import { isFavoriteClickedState } from '@/recoil/words/favorites.state'
import { selectedLanguageState } from '@/recoil/words/languages.state'
import { selectedSemesterState } from '@/recoil/words/semesters.state'
import { selectedCustomizedTagsState } from '@/recoil/words/tags.state'
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
