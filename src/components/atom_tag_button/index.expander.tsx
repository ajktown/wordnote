import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import {
  isSemesterExpandedState,
  semestersState,
} from '@/recoil/semesters.state'
import { FC, useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

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

  if (semesters.length < visibleAt) return null

  return (
    <StyledTagButtonAtom
      label={isSemesterExpanded ? `→` : `...`}
      onClick={onClick}
    />
  )
}

export default TagButtonExpander
