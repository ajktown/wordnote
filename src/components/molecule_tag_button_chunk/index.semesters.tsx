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
    () => (isSemesterExpanded ? 0 : PRIVATE_DEFAULT_EXPAND_ENABLED_COUNT * -1),
    [isSemesterExpanded],
  )

  return (
    <Box>
      <TagButtonAllSemesters />
      <TagButtonExpander visibleAt={PRIVATE_DEFAULT_EXPAND_ENABLED_COUNT} />
      {semesters.slice(sliceAt).map((semester) => (
        <TagButtonSemester key={semester.code} semester={semester} />
      ))}
    </Box>
  )
}

export default TagButtonChunkSemesters
