import {
  isFavoriteClickedSelector,
  selectedSemesterSelector,
} from '@/states/words/words.selectors'
import { Typography, Stack } from '@mui/material'
import { FC, Fragment } from 'react'
import { useRecoilValue } from 'recoil'

const PRIVATE_DEFAULT_SELECTED = `Nothing found matching the selected tags`
const PRIVATE_DEFAULT_NOTHING_FOUND = `It seems like you do not have any words stored in our database`

const WordCardsChunkNoWordsFoundBody: FC = () => {
  const selectedSemester = useRecoilValue(selectedSemesterSelector)
  const isFavoriteClicked = useRecoilValue(isFavoriteClickedSelector)

  if (isFavoriteClicked || selectedSemester)
    return <Fragment>{PRIVATE_DEFAULT_SELECTED}</Fragment>
  return <Fragment>{PRIVATE_DEFAULT_NOTHING_FOUND}</Fragment>
}

const WordCardsChunkNoWordsFound: FC = () => {
  return (
    <Stack>
      <Typography>
        <WordCardsChunkNoWordsFoundBody />
      </Typography>
    </Stack>
  )
}

export default WordCardsChunkNoWordsFound
