import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { isFavoriteClickedState } from '@/recoil/favorites.state'
import { selectedLanguageState } from '@/recoil/languages.state'
import { selectedSemesterState } from '@/recoil/semesters.state'
import { wordIdsState } from '@/recoil/words.state'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'

const TagButtonAllSemesters: FC = () => {
  const selectedSemester = useRecoilValue(selectedSemesterState)
  const onResetSelectedSemester = useResetRecoilState(selectedSemesterState)
  const onResetFavoriteClicked = useResetRecoilState(isFavoriteClickedState)
  const onResetSelectedLanguage = useResetRecoilState(selectedLanguageState)
  const filteredIds = useRecoilValue(wordIdsState)

  const variant: GlobalMuiTagVariant = useMemo(
    () => (selectedSemester === null ? `filled` : `outlined`),
    [selectedSemester],
  )

  const onClick = useCallback(() => {
    onResetSelectedSemester()
    onResetFavoriteClicked()
    onResetSelectedLanguage()
  }, [onResetSelectedSemester, onResetFavoriteClicked, onResetSelectedLanguage])

  return (
    <StyledTagButtonAtom
      label={`All (${filteredIds.length})`}
      onClick={onClick}
      style={{
        variant,
      }}
    />
  )
}

export default TagButtonAllSemesters
