import { wordsFamily } from '@/recoil/words/words.state'
import { Box } from '@mui/material'
import { FC, useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import TagButtonDeletable from '../atom_tag_button/index.deletable'
import { usePutWord } from '@/hooks/words/use-put-word.hook'

interface Props {
  wordId: string
}

// TODO: Maybe it can undo deleting? but optional.
// TODO: Maybe also can add a new tag, but then you no longer can call this chunk, but maybe Frame?
const TagButtonDeletableChunk: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const onPutWord = usePutWord(wordId)
  const onClickDelete = useCallback(
    async (deletingLabel: string) => {
      if (word == null) return
      await onPutWord({
        tags: word.tags.filter((tag) => tag !== deletingLabel),
      })
    },
    [word, onPutWord],
  )

  if (word == null) return null

  return (
    <Box>
      {word.tags.map((tag) => (
        <TagButtonDeletable
          key={tag}
          onClickDelete={onClickDelete}
          label={tag}
        />
      ))}
    </Box>
  )
}

export default TagButtonDeletableChunk
