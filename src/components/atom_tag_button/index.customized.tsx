import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { selectedTagsState } from '@/recoil/tags.state'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilState } from 'recoil'

interface Props {
  label: string
}
const TagButtonCustomized: FC<Props> = ({ label }) => {
  const [tags, setTags] = useRecoilState(selectedTagsState)
  const isTagSelected = useMemo(() => tags.includes(label), [tags, label])

  const variant: GlobalMuiTagVariant = useMemo(() => {
    return isTagSelected ? `filled` : `outlined`
  }, [isTagSelected])

  const onClick = useCallback(() => {
    if (!isTagSelected) setTags([...tags, label])
    else setTags([...tags].filter((tag) => tag !== label))
  }, [label, tags, isTagSelected, setTags])

  return (
    <StyledTagButtonAtom
      label={`#` + label}
      style={{
        variant,
      }}
      onClick={onClick}
    />
  )
}

export default TagButtonCustomized
