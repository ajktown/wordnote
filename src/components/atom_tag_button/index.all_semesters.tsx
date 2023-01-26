import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { isFavoriteClickedState } from '@/recoil/favorites.state'
import { selectedSemesterState } from '@/recoil/semesters.state'
import { wordIdsState } from '@/recoil/words.state'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'

const TagButtonAllSemesters: FC = () => {
  const selectedSemester = useRecoilValue(selectedSemesterState)
  const onResetSelectedSemester = useResetRecoilState(selectedSemesterState)
  const onResetFavoriteClicked = useResetRecoilState(isFavoriteClickedState)
  const filteredIds = useRecoilValue(wordIdsState)

  const variant: GlobalMuiTagVariant = useMemo(
    () => (selectedSemester === null ? `filled` : `outlined`),
    [selectedSemester],
  )

  const onClick = useCallback(() => {
    // TODO: Requires to reset the language code too
    onResetSelectedSemester()
    onResetFavoriteClicked()
  }, [onResetSelectedSemester, onResetFavoriteClicked])

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
