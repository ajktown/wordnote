import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { selectedCustomizedTagsState } from '@/recoil/tags.state'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilState } from 'recoil'

interface Props {
  label: string
}
const TagButtonCustomized: FC<Props> = ({ label }) => {
  const [selectedCustomizedTags, setSelectedCustomizedTags] = useRecoilState(
    selectedCustomizedTagsState,
  )
  const isTagSelected = useMemo(
    () => selectedCustomizedTags.includes(label),
    [selectedCustomizedTags, label],
  )

  const variant: GlobalMuiTagVariant = useMemo(() => {
    return isTagSelected ? `filled` : `outlined`
  }, [isTagSelected])

  const onClick = useCallback(() => {
    if (!isTagSelected)
      setSelectedCustomizedTags([...selectedCustomizedTags, label])
    else
      setSelectedCustomizedTags(
        [...selectedCustomizedTags].filter((tag) => tag !== label),
      )
  }, [label, selectedCustomizedTags, isTagSelected, setSelectedCustomizedTags])

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
