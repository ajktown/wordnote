import { Stack } from '@mui/material'
import { FC } from 'react'
import TagChipCustomized from '../atom_tag_chip/index.customized'
import TagChipLanguage from '../atom_tag_chip/index.language'
import TagChipSemesterCode from '../atom_tag_chip/index.semester-code'
import { WordData } from '@/api/words/interfaces'

interface Props {
  word: WordData
  clickDisabled?: boolean
}
const TagButtonChunk: FC<Props> = ({ word, clickDisabled }) => {
  return (
    <Stack
      direction="row"
      spacing={0.2}
      sx={{ flexWrap: `wrap`, rowGap: `3px` }}
    >
      <TagChipSemesterCode semesterCode={word.semester} />
      <TagChipLanguage
        languageCode={word.languageCode}
        clickDisabled={clickDisabled}
      />
      {word.tags.map((tag) => (
        <TagChipCustomized
          key={tag}
          label={tag}
          clickDisabled={clickDisabled}
        />
      ))}
    </Stack>
  )
}

export default TagButtonChunk
