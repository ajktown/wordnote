import { selectedSemesterState } from '@/recoil/semesters.state'
import { Typography, Stack } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

const PRIVATE_DEFAULT_SELECTED = `Nothing found matching the selected tags`
const PRIVATE_DEFAULT_NOTHING_FOUND = `It seems like you do not have any words stored in our database. `

const WordCardsChunkNoWordsFound: FC = () => {
  const selectedSemester = useRecoilValue(selectedSemesterState)

  return (
    <Stack>
      <Typography>
        {selectedSemester
          ? PRIVATE_DEFAULT_SELECTED
          : PRIVATE_DEFAULT_NOTHING_FOUND}
      </Typography>
    </Stack>
  )
}

export default WordCardsChunkNoWordsFound
