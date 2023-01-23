import { Box } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { languageCodesBySemesterState } from '@/recoil/languages.state'
import TagButtonLanguage from '../atom_tag_button/index.language'

const TagButtonChunkDetailed: FC = () => {
  const languageCodes = useRecoilValue(languageCodesBySemesterState)

  return (
    <Box>
      {languageCodes.map((code) => (
        <TagButtonLanguage key={code} languageCode={code} />
      ))}
    </Box>
  )
}

export default TagButtonChunkDetailed
