import { FC } from 'react'
import { Stack, Box } from '@mui/material'
import NewWordBox from '../molecule_new_word_box'
import WordCardsFrameRefreshButton from '../atom_word_cards_frame_refresh_button'
import WordCardsSurfingButton from '../atom_word_cards_frame_surfing_button'
import WordCardsChunk from '../organism_word_card_chunk'
import { WordCardFrameStyle } from './index.style'
import WordCardDialog from '../molecule_word_card/index.dialog'
import TagButtonChunkSemesters from '../molecule_tag_button_chunk/index.semesters'
import TagButtonChunkDetailed from '../molecule_tag_button_chunk/index.detailed'
import WordCardsFramePreferenceButtonPart from '../atom_word_cards_frame_parts/index.preference-button'

const WordCardFrame: FC = () => {
  return (
    <Stack width="100%" alignItems="center">
      <Stack {...WordCardFrameStyle}>
        {/* Header */}
        <Stack direction="row" spacing={0.5}>
          <Box flexGrow={1} />
          <WordCardsSurfingButton />
          <WordCardsFrameRefreshButton />
          <WordCardsFramePreferenceButtonPart />
        </Stack>
        <Stack alignItems={`center`} spacing={0.35}>
          <TagButtonChunkSemesters />
          <TagButtonChunkDetailed />
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
