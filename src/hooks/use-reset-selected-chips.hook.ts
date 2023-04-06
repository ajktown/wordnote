import { useCallback } from 'react'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import { deprecatedIsFavoriteClickedState } from '@/recoil/words/favorites.state'
import { selectedLanguageState } from '@/recoil/words/languages.state'
import { deprecatedSelectedSemesterState } from '@/recoil/words/semesters.state'
import { selectedCustomizedTagsState } from '@/recoil/words/tags.state'

export const useResetSelectedChips = (code?: number) => {
  const setSelectedSemester = useSetRecoilState(deprecatedSelectedSemesterState)
  const onResetSelectedSemester = useResetRecoilState(
    deprecatedSelectedSemesterState,
  )
  const onResetFavoriteClicked = useResetRecoilState(
    deprecatedIsFavoriteClickedState,
  )
  const onResetSelectedLanguage = useResetRecoilState(selectedLanguageState)
  const onResetSelectedTagsState = useResetRecoilState(
    selectedCustomizedTagsState,
  )

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
