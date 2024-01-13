import { Stack } from '@mui/material'
import { FC } from 'react'
import TagChipDeletable from '../atom_tag_chip/index.deletable'
import { usePutWordTagDeleted } from '@/hooks/words/use-put-word-tag-deleted.hook'
import WordCardAddTagButton from '../atom_word_card_add_tag_button'

interface Props {
  wordId: string
}

// TODO: Maybe it can undo deleting? but optional.
// TODO: Maybe also can add a new tag, but then you no longer can call this chunk, but maybe Frame?
const TagButtonDeletableChunk: FC<Props> = ({ wordId }) => {
  const [word, onClickDelete] = usePutWordTagDeleted(wordId)

  if (word == null) return null

  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{ flexWrap: `wrap`, rowGap: `3px` }}
    >
      <WordCardAddTagButton wordId={wordId} />
      {word.tags.map((tag) => (
        <TagChipDeletable
          key={tag}
          handleClickDelete={onClickDelete}
          label={tag}
        />
      ))}
    </Stack>
  )
}

export default TagButtonDeletableChunk
