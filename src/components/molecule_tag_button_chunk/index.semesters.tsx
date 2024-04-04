import {
  isSemesterExpandedState,
  semestersState,
} from '@/recoil/words/semesters.state'
import { Box } from '@mui/material'
import { FC, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import TagChipSemester from '@/components/atom_tag_chip/index.semester'
import TagChipExpander from '../atom_tag_chip/index.expander'
import TagChipEveryFavorite from '../atom_tag_chip/index.every-favorite'

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
      <TagChipEveryFavorite />
      {semesters &&
        semesters
          .slice(0, sliceAt)
          .map((semester) => (
            <TagChipSemester key={semester.code} semester={semester} />
          ))}

      {/* +1 as TagButtonExpander must be visible after 4 semesters */}
      <TagChipExpander visibleAt={PRIVATE_DEFAULT_EXPAND_ENABLED_COUNT + 1} />
    </Box>
  )
}

export default TagButtonChunkSemesters
