import { Box } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { languagesPerSemesterState } from '@/recoil/languages.state'
import TagButtonLanguage from '../atom_tag_button/index.language'

const TagButtonChunkDetailed: FC = () => {
  const languages = useRecoilValue(languagesPerSemesterState)

  return (
    <Box>
      {languages.map((language) => (
        <TagButtonLanguage key={language} languageCode={language} />
      ))}
    </Box>
  )
}

export default TagButtonChunkDetailed
