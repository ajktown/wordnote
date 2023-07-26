import { FC, useCallback } from 'react'
import StyledSurfingIcon from '@/atoms/StyledSurfingIcon'
import { useSemesters } from '@/hooks/semesters/use-semesters.hook'
import { useWords } from '@/hooks/words/use-words.hook'

const WordCardsSurfingButton: FC = () => {
  const [, getWords] = useWords()
  const getSemesters = useSemesters()

  const onClickSurfing = useCallback(async () => {
    const semesters = await getSemesters()
    if (!semesters.latestSemesterCode) return

    await getWords({ semester: semesters.latestSemesterCode })
  }, [getWords, getSemesters])

  return <StyledSurfingIcon onClick={onClickSurfing} runOnClickOnce />
}

export default WordCardsSurfingButton