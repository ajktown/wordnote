import { wordsFamily } from '@/recoil/words/words.state'
import { Stack } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import TagChipCustomized from '../atom_tag_chip/index.customized'
import TagChipLanguage from '../atom_tag_chip/index.language'

interface Props {
  wordId: string
}
const TagButtonChunk: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))

  if (word == null) return null

  return (
    <Stack
      direction="row"
      spacing={0.2}
      sx={{ flexWrap: `wrap`, rowGap: `3px` }}
    >
      <TagChipLanguage languageCode={word.languageCode} />
      {word.tags.map((tag) => (
        <TagChipCustomized key={tag} label={tag} />
      ))}
    </Stack>
  )
}

export default TagButtonChunk
