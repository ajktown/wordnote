import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import SurfingIcon from '@mui/icons-material/Surfing'
import { FC } from 'react'
import { useSemesterClick } from '@/hooks/semesters/use-semester-click.hook'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { semestersState } from '@/recoil/words/semesters.state'
import { selectedSemesterSelector } from '@/recoil/words/words.selectors'

const WordCardsFrameSurfingButton: FC = () => {
  const [, onSemesterClick] = useSemesterClick()

  const onClick = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const semesters = await snapshot.getPromise(semestersState)
        if (semesters === undefined || semesters.length <= 1) return
        const selectedSemester = await snapshot.getPromise(
          selectedSemesterSelector,
        )
        const filteredSemesters = semesters.filter(
          (semester) => semester.code !== selectedSemester,
        )
        const randomIndex = Math.floor(Math.random() * filteredSemesters.length)
        await onSemesterClick(filteredSemesters[randomIndex].code)
      },
    [onSemesterClick],
  )
  const semesters = useRecoilValue(semestersState)
  const isDisabled = semesters === undefined || semesters.length < 3
  const hoverMessage = {
    title: isDisabled
      ? `Requires 3 or more semesters to activate`
      : `Randomly Select Semester`,
  }

  return (
    <StyledIconButtonAtom
      onClick={onClick}
      isDisabled={isDisabled}
      jsxElementButton={<SurfingIcon fontSize="small" />}
      hoverMessage={hoverMessage}
    />
  )
}

export default WordCardsFrameSurfingButton
