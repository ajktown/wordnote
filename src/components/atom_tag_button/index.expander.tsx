import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import {
  isSemesterExpandedState,
  semestersState,
} from '@/recoil/words/semesters.state'
import { FC, useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

interface Props {
  visibleAt: number
}

const TagButtonExpander: FC<Props> = ({ visibleAt }) => {
  const semesters = useRecoilValue(semestersState)
  const [isSemesterExpanded, setSemesterExpanded] = useRecoilState(
    isSemesterExpandedState,
  )

  const onClick = useCallback(() => {
    setSemesterExpanded(!isSemesterExpanded)
  }, [isSemesterExpanded, setSemesterExpanded])

  if (!semesters || semesters.length < visibleAt) return null

  return (
    <StyledTagButtonAtom
      label={isSemesterExpanded ? null : `...`}
      FrontIcon={
        isSemesterExpanded ? <ChevronLeftIcon fontSize="small" /> : undefined
      }
      onClick={onClick}
    />
  )
}

export default TagButtonExpander
