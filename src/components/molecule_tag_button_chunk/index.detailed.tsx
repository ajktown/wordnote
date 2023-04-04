import { Box } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { languageCodesBySemesterState } from '@/recoil/words/languages.state'
import TagButtonLanguage from '../atom_tag_button/index.language'
import TagButtonFavorite from '../atom_tag_button/index.favorite'
import { customizedTagsState } from '@/recoil/words/tags.state'
import { simplifiedDaysBeforeState } from '@/recoil/words/created-date-tags.state'
import TagButtonCustomized from '../atom_tag_button/index.customized'
import TagButtonDaysAgo from '../atom_tag_button/index.days_ago'
import { selectedSemesterState } from '@/recoil/words/words.state'

const TagButtonChunkDetailed: FC = () => {
  const languageCodes = useRecoilValue(languageCodesBySemesterState)
  const customizedTags = useRecoilValue(customizedTagsState)
  const simplifiedDaysBefore = useRecoilValue(simplifiedDaysBeforeState)
  const selectedSemester = useRecoilValue(selectedSemesterState)

  if (!selectedSemester) return null

  return (
    <Box>
      {<TagButtonFavorite />}
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
