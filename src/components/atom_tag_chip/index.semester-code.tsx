import StyledChip from '@/atoms/StyledChip'
import { FC } from 'react'

interface Props {
  semesterCode: number // semester code i.e) 224 => 2022Y 4Q
}
const TagChipSemesterCode: FC<Props> = ({ semesterCode }) => {
  // parsing semester code
  const year = Math.floor(semesterCode / 10)
  const quarter = semesterCode % 10

  return (
    <StyledChip
      key={semesterCode}
      clickDisabled
      label={`20${year}Y ${quarter}Q`}
    />
  )
}

export default TagChipSemesterCode
