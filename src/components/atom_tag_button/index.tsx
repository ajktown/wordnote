import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { PROTECTED_AVAILABLE_LANGUAGES } from '@/global.constants'
import { FC } from 'react'

const PRIVATE_HASH_TAG = `#`

interface Props {
  tagId: string
}

const getLabel = (tagId: string) => {
  for (const { code, nativeNameWithFlag } of PROTECTED_AVAILABLE_LANGUAGES) {
    if (tagId === code) return nativeNameWithFlag
  }
  return PRIVATE_HASH_TAG + tagId
}
const TagButton: FC<Props> = ({ tagId }) => {
  return <StyledTagButtonAtom label={getLabel(tagId)} />
}

export default TagButton
