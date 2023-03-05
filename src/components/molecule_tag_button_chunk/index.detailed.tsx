import { Box } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { languageCodesBySemesterState } from '@/recoil/languages.state'
import TagButtonLanguage from '../atom_tag_button/index.language'
import TagButtonFavorite from '../atom_tag_button/index.favorite'
import { customizedTagsState } from '@/recoil/tags.state'
import { simplifiedDaysBeforeState } from '@/recoil/words/created-date-tags.state'
import TagButtonCustomized from '../atom_tag_button/index.customized'
import TagButtonDaysAgo from '../atom_tag_button/index.days_ago'

const TagButtonChunkDetailed: FC = () => {
  const languageCodes = useRecoilValue(languageCodesBySemesterState)
  const customizedTags = useRecoilValue(customizedTagsState)
  const simplifiedDaysBefore = useRecoilValue(simplifiedDaysBeforeState)

  return (
    <Box>
      <TagButtonFavorite />
      {simplifiedDaysBefore.map((daysAgo) => (
        <TagButtonDaysAgo key={daysAgo} daysAgo={daysAgo} />
      ))}
      {languageCodes.map((code) => (
        <TagButtonLanguage key={code} languageCode={code} />
      ))}
      {customizedTags.map((tag) => (
        <TagButtonCustomized key={tag} label={tag} />
      ))}
    </Box>
  )
}

export default TagButtonChunkDetailed
