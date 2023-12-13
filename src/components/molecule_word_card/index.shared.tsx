import { FC } from 'react'
import { Card, CardActions, CardContent, Typography } from '@mui/material'
import { useRecoilValue } from 'recoil'
import WordCardUnknown from './index.unknown'
import StyledSuspense from '@/organisms/StyledSuspense'
import TagButtonChunk from '../molecule_tag_button_chunk'
import DictLinkButtonChunk from '../molecule_dict_link_button_chunk'
import WordCardExamplePart from '../atom_word_card_parts/index.example'
import { sharedWordFamily } from '@/recoil/shared-resource/shared-resource.state'
import WordCardSkeleton from './index.skeleton'

interface Props {
  wordId: string
}
const WordCardShared: FC<Props> = ({ wordId }) => {
  const sharedWord = useRecoilValue(sharedWordFamily(wordId))

  if (sharedWord === undefined) return <WordCardSkeleton />
  if (sharedWord === null) return <WordCardUnknown />

  return (
    <StyledSuspense>
      <Card style={{ width: `100%`, borderRadius: 9 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {sharedWord.term}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {sharedWord.pronunciation}
          </Typography>
          <Typography variant="body2">
            {sharedWord.definition}
            <br />
          </Typography>
          <WordCardExamplePart word={sharedWord} />
        </CardContent>
        <CardActions>
          <TagButtonChunk wordId={wordId} />
          <DictLinkButtonChunk wordId={wordId} />
        </CardActions>
      </Card>
    </StyledSuspense>
  )
}

export default WordCardShared
