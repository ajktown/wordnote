import {
  isSemesterExpandedState,
  semestersState,
} from '@/recoil/semesters.state'
import { Box } from '@mui/material'
import { FC, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import TagButtonSemester from '@/components/atom_tag_button/index.semester'
import TagButtonAllSemesters from '../atom_tag_button/index.all_semesters'
import TagButtonExpander from '../atom_tag_button/index.expander'

const PRIVATE_DEFAULT_EXPAND_ENABLED_COUNT = 3

const TagButtonChunkSemesters: FC = () => {
  const semesters = useRecoilValue(semestersState)
  const isSemesterExpanded = useRecoilValue(isSemesterExpandedState)
  const sliceAt = useMemo(
    () =>
      isSemesterExpanded ? undefined : PRIVATE_DEFAULT_EXPAND_ENABLED_COUNT,
    [isSemesterExpanded],
  )

  return (
    <Box>
      <TagButtonAllSemesters />
      {semesters.slice(0, sliceAt).map((semester) => (
        <TagButtonSemester key={semester.code} semester={semester} />
      ))}
      <TagButtonExpander visibleAt={PRIVATE_DEFAULT_EXPAND_ENABLED_COUNT} />
    </Box>
  )
}

export default TagButtonChunkSemesters
