import { Box } from '@mui/material'
import { FC } from 'react'
import TagButtonDeletable from '../atom_tag_button/index.deletable'
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
    <Box>
      <WordCardAddTagButton wordId={wordId} />
      {word.tags.map((tag) => (
        <TagButtonDeletable
          key={tag}
          handleClickDelete={onClickDelete}
          label={tag}
        />
      ))}
    </Box>
  )
}

export default TagButtonDeletableChunk
