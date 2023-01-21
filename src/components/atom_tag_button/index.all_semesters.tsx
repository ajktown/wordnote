import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { selectedSemesterState } from '@/recoil/semesters.state'
import { wordIdsState } from '@/recoil/words.state'
import { FC, useMemo } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'

const TagButtonAllSemesters: FC = () => {
  const selectedSemester = useRecoilValue(selectedSemesterState)
  const onResetSelectedSemester = useResetRecoilState(selectedSemesterState)
  const filteredIds = useRecoilValue(wordIdsState)

  const variant: GlobalMuiTagVariant = useMemo(() => (
    selectedSemester === null ? `filled` : `outlined`
  ), [selectedSemester])

  return (
    <StyledTagButtonAtom
      label={`All (${filteredIds.length})`}
      onClick={onResetSelectedSemester}
      style={{
        variant,
      }}
    />
  )
}

export default TagButtonAllSemesters
