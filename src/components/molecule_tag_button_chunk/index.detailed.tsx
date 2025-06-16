import { Box } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import TagChipLanguage from '../atom_tag_chip/index.language'
import TagChipFavorite from '../atom_tag_chip/index.favorite'
import TagChipCustomized from '../atom_tag_chip/index.customized'
import TagChipDaysAgo from '../atom_tag_chip/index.days_ago'
import { semesterDetailsFamily } from '@/states/words/semesters.state'
import { selectedSemesterSelector } from '@/states/words/words.selectors'

// TODO: move this somewhere else? Maybe should be stored in the database? At least API?
const visibleDaysAgoChunk = [0, 1, 4, 7, 14, 21, 30]

const TagButtonChunkDetailed: FC = () => {
  const selectedSemester = useRecoilValue(selectedSemesterSelector)
  const semesterDetails = useRecoilValue(
    semesterDetailsFamily(selectedSemester ?? 0),
  )

  if (!semesterDetails) return null

  return (
    <Box>
      {<TagChipFavorite />}
      {visibleDaysAgoChunk
        .filter((el) => semesterDetails.daysAgo.includes(el))
        .map((daysAgo) => (
          <TagChipDaysAgo key={daysAgo} daysAgo={daysAgo} />
        ))}
      {semesterDetails.languages.map((code) => (
        <TagChipLanguage key={code} languageCode={code} />
      ))}
      {semesterDetails.tags.map((tag) => (
        <TagChipCustomized key={tag} label={tag} />
      ))}
    </Box>
  )
}

export default TagButtonChunkDetailed
