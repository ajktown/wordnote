import { Box } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import TagButtonLanguage from '../atom_tag_button/index.language'
import TagButtonFavorite from '../atom_tag_button/index.favorite'
import TagButtonCustomized from '../atom_tag_button/index.customized'
import TagButtonDaysAgo from '../atom_tag_button/index.days_ago'
import { selectedSemesterState } from '@/recoil/words/words.state'
import { semesterDetailFamily } from '@/recoil/words/semesters.state'

const TagButtonChunkDetailed: FC = () => {
  const selectedSemester = useRecoilValue(selectedSemesterState)
  const semesterDetails = useRecoilValue(
    semesterDetailFamily(selectedSemester?.toString() || ``),
  )

  if (!selectedSemester) return null

  return (
    <Box>
      {<TagButtonFavorite />}
      {semesterDetails.daysAgo.map((daysAgo) => (
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
