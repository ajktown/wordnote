import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import SurfingIcon from '@mui/icons-material/Surfing'
import { FC, useCallback } from 'react'
import { useSemesterClick } from '@/hooks/semesters/use-semester-click.hook'

const WordCardsFrameSurfingButton: FC = () => {
  const [, onSemesterClick] = useSemesterClick()
  const onClick = useCallback(async () => {
    await onSemesterClick(233)
  }, [, onSemesterClick])
  return (
    <StyledIconButtonAtom
      onClick={onClick}
      jsxElementButton={<SurfingIcon fontSize="small" />}
    />
  )
}

export default WordCardsFrameSurfingButton
