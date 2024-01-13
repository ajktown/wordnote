import {
  isSemesterExpandedState,
  semestersState,
} from '@/recoil/words/semesters.state'
import { Box } from '@mui/material'
import { FC, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import TagButtonSemester from '@/components/atom_tag_chip/index.semester'
import TagButtonExpander from '../atom_tag_chip/index.expander'

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
      {semesters &&
        semesters
          .slice(0, sliceAt)
          .map((semester) => (
            <TagButtonSemester key={semester.code} semester={semester} />
          ))}

      {/* +1 as TagButtonExpander must be visible after 4 semesters */}
      <TagButtonExpander visibleAt={PRIVATE_DEFAULT_EXPAND_ENABLED_COUNT + 1} />
    </Box>
  )
}

export default TagButtonChunkSemesters
