import { Box } from '@mui/material'
import { FC } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { fixedTagsState } from '@/states/words/words.state'
import TagChipDeletable from '../atom_tag_chip/index.deletable'

const TagButtonChunkFixed: FC = () => {
  const fixedTags = useRecoilValue(fixedTagsState)

  const onClickDelete = useRecoilCallback(
    ({ set }) =>
      async (label: string) => {
        const fixedTagSet = new Set(fixedTags)
        fixedTagSet.delete(label)
        set(fixedTagsState, Array.from(fixedTagSet))
      },
    [fixedTags],
  )

  return (
    <Box>
      {fixedTags.map((tag) => (
        <TagChipDeletable key={tag} label={tag} onClick={onClickDelete} />
      ))}
    </Box>
  )
}

export default TagButtonChunkFixed
