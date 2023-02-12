import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { useResetSelectedChips } from '@/hooks/use-reset-selected-chips.hook'
import { selectedSemesterState } from '@/recoil/semesters.state'
import { wordIdsState } from '@/recoil/words.state'
import { FC, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

const TagButtonAllSemesters: FC = () => {
  const selectedSemester = useRecoilValue(selectedSemesterState)
  const filteredIds = useRecoilValue(wordIdsState)
  const handleClickResetSelectedChips = useResetSelectedChips()

  const variant: GlobalMuiTagVariant = useMemo(
    () => (selectedSemester === null ? `filled` : `outlined`),
    [selectedSemester],
  )

  return (
    <StyledTagButtonAtom
      label={`All (${filteredIds.length})`}
      onClick={handleClickResetSelectedChips}
      style={{
        variant,
      }}
    />
  )
}

export default TagButtonAllSemesters
