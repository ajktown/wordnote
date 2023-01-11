import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { PROTECTED_AVAILABLE_LANGUAGES } from '@/global.constants'
import { wordsFamily } from '@/recoil/words.state'
import { Box } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

const PRIVATE_HASH_TAG = `#`

const getLabel = (tagId: string) => {
  for (const { code, nativeNameWithFlag } of PROTECTED_AVAILABLE_LANGUAGES) {
    if (tagId === code) return nativeNameWithFlag
  }
  return PRIVATE_HASH_TAG + tagId
}

interface Props {
  wordId: string
}
const TagButtonChunk: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))

  if (word === null) return null

  return (
    <Box>
      <StyledTagButtonAtom label={getLabel(word.languageCode)} />
      {word.tags.map((tag) => (
        <StyledTagButtonAtom key={tag} label={getLabel(tag)} />
      ))}
    </Box>
  )
}

export default TagButtonChunk
