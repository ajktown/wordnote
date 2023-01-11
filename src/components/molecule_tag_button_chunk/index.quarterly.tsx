import { semestersState } from '@/recoil/semesters.state'
import { Box } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import TagButtonSemester from '@/components/atom_tag_button/index.semester'

const TagButtonChunkQuarterly: FC = () => {
  const semesters = useRecoilValue(semestersState)

  if (semesters.length === 0) return null

  return (
    <Box>
      {semesters.map((semester) => (
        <TagButtonSemester key={semester.code} semester={semester} />
      ))}
    </Box>
  )
}

export default TagButtonChunkQuarterly
