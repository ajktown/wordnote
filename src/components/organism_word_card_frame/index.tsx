import { FC } from 'react'
import { Stack, Box } from '@mui/material'
import NewWordBox from '../molecule_new_word_box'
import WordCardsFrameRefreshButton from '../atom_word_cards_frame_refresh_button'
import WordCardsChunk from '../organism_word_card_chunk'

const WordCardFrame: FC = () => {
  return (
    <Stack width="100%" alignItems="center">
      <Stack
        p={1}
        style={{ backgroundColor: `#aaa` }}
        width="100%"
        maxWidth={1000}
        spacing={1}
        borderRadius={4}
      >
        {/* Header */}
        <Stack direction="row" spacing={0.5}>
          <Box flexGrow={1} />
          <WordCardsFrameRefreshButton />
        </Stack>
        {/* Body */}
        <Stack spacing={0.5} alignItems="center">
          <NewWordBox />
          <WordCardsChunk />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default WordCardFrame
