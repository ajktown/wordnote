import { wordsFamily } from '@/recoil/words/words.state'
import { Box } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import TagButtonCustomized from '../atom_tag_button/index.customized'
import TagButtonLanguage from '../atom_tag_button/index.language'

interface Props {
  wordId: string
}
const TagButtonChunk: FC<Props> = ({ wordId }) => {
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

export default TagButtonChunk
