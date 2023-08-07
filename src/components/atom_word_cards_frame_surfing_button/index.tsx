import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import SurfingIcon from '@mui/icons-material/Surfing'
import { FC } from 'react'
import { useSemesterClick } from '@/hooks/semesters/use-semester-click.hook'
import { useRecoilCallback } from 'recoil'
import { semestersState } from '@/recoil/words/semesters.state'

const WordCardsFrameSurfingButton: FC = () => {
  const [, onSemesterClick] = useSemesterClick()

  const onClick = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const semesters = await snapshot.getPromise(semestersState)
        if (semesters === undefined || semesters.length <= 1) return
        const randomIndex = Math.floor(Math.random()*semesters.length)
        await onSemesterClick(semesters[randomIndex].code);
      },
    [onSemesterClick],
  )
  return (
    <StyledIconButtonAtom
      onClick={onClick}
      jsxElementButton={<SurfingIcon fontSize="small" />}
    />
  )
}

export default WordCardsFrameSurfingButton
