import { Box } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import TagButtonLanguage from '../atom_tag_button/index.language'
import TagButtonFavorite from '../atom_tag_button/index.favorite'
import TagButtonCustomized from '../atom_tag_button/index.customized'
import TagButtonDaysAgo from '../atom_tag_button/index.days_ago'
import { semesterDetailsFamily } from '@/recoil/words/semesters.state'
import { selectedSemesterSelector } from '@/recoil/words/words.selectors'

// TODO: move this somewhere else? Maybe should be stored in the database? At least API?
const visibleDaysAgoChunk = [0, 1, 4, 7, 14, 21, 30]

const TagButtonChunkDetailed: FC = () => {
  const selectedSemester = useRecoilValue(selectedSemesterSelector)
  const semesterDetails = useRecoilValue(
    semesterDetailsFamily(selectedSemester || 0),
  )

  if (!semesterDetails) return null

  return (
    <Box>
      {<TagButtonFavorite />}
      {visibleDaysAgoChunk
        .filter((el) => semesterDetails.daysAgo.includes(el))
        .map((daysAgo) => (
          <TagButtonDaysAgo key={daysAgo} daysAgo={daysAgo} />
        ))}
      {semesterDetails.languages.map((code) => (
        <TagButtonLanguage key={code} languageCode={code} />
      ))}
      {semesterDetails.tags.map((tag) => (
        <TagButtonCustomized key={tag} label={tag} />
      ))}
    </Box>
  )
}

export default TagButtonChunkDetailed
