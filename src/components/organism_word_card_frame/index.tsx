import { FC } from 'react'
import { Stack, Box } from '@mui/material'
import NewWordBox from '../molecule_new_word_box'
import WordCardsFrameRefreshButton from '../atom_word_cards_frame_refresh_button'
import WordCardsChunk from '../organism_word_card_chunk'
import { WordCardFrameStyle } from './index.style'
import WordCardDialog from '../molecule_word_card/index.dialog'

const WordCardFrame: FC = () => {
  return (
    <Stack width="100%" alignItems="center">
      <Stack {...WordCardFrameStyle}>
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
        {/* Dialog */}
        <WordCardDialog />
      </Stack>
    </Stack>
  )
}

export default WordCardFrame
