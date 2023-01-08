import { wordsFamily } from '@/recoil/words.state'
import { Box } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import TagButton from '../atom_tag_button'

interface Props {
  wordId: string
}
const TagButtonChunk: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))

  if (word === null) return null
  
  const tags = [word.languageCode]

  return (
    <Box>
      {tags.map(tag => <TagButton key={tag} tagId={tag}/>)}
    </Box>
  )
}

export default TagButtonChunk