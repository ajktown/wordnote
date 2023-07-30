import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import SurfingIcon from '@mui/icons-material/Surfing'
import { FC, useCallback } from 'react'
import { useSemesters } from '@/hooks/semesters/use-semesters.hook'
import { useWords } from '@/hooks/words/use-words.hook'

const WordCardsFrameSurfingButton: FC = () => {
  const [, getWords] = useWords()
  const getSemesters = useSemesters()

  const onClickRefresh = useCallback(async () => {
    const semesters = await getSemesters()
    if (!semesters.latestSemesterCode) return

    await getWords({ semester: semesters.latestSemesterCode })
  }, [getWords, getSemesters])
  return (
    <StyledIconButtonAtom
      onClick={onClickRefresh}
      jsxElementButton={<SurfingIcon fontSize="small" />}
    />
  )
}

export default WordCardsFrameSurfingButton
