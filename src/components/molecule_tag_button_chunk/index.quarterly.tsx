import { semestersState } from '@/recoil/semesters.state'
import { Box } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import StyledTagButtonAtom from '@/atoms/StyledTagButton'

const TagButtonChunkQuarterly: FC = () => {
  const semesters = useRecoilValue(semestersState)

  if (semesters.length === 0) return null

  return (
    <Box>
      {semesters.map((semester) => (
        <StyledTagButtonAtom
          key={semester.code}
          label={`${semester.year}Y ${semester.quarter}Q`}
          style={{
            variant: `filled`,
          }}
        />
      ))}
    </Box>
  )
}

export default TagButtonChunkQuarterly
