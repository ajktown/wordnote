import { wordsFamily } from '@/recoil/words/words.state'
import { Box } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import TagButtonCustomized from '../atom_tag_button/index.customized'
import TagButtonLanguage from '../atom_tag_button/index.language'

interface Props {
  wordId: string
}
// TODO: This should not be clickable, but actually deletable if end user wish
// TODO: Maybe it can undo deleting? but optional.
// TODO: Maybe also can add a new tag, but then you no longer can call this chunk, but maybe Frame?
const TagButtonModifiableChunk: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))

  if (word == null) return null

  return (
    <Box>
      <TagButtonLanguage languageCode={word.languageCode} />
      {word.tags.map((tag) => (
        <TagButtonCustomized key={tag} label={tag} />
      ))}
    </Box>
  )
}

export default TagButtonModifiableChunk
