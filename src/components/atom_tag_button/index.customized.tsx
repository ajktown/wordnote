import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { useWordIds } from '@/hooks/words/use-word-ids.hook'
import { selectedTagsState } from '@/recoil/words/words.state'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

interface Props {
  label: string
}
const TagButtonCustomized: FC<Props> = ({ label }) => {
  const selectedCustomizedTags = useRecoilValue(selectedTagsState)
  const [loading, handleGetWordIds] = useWordIds()

  const isTagSelected = useMemo(
    () => selectedCustomizedTags.includes(label),
    [selectedCustomizedTags, label],
  )

  const variant: GlobalMuiTagVariant = useMemo(() => {
    return isTagSelected ? `filled` : `outlined`
  }, [isTagSelected])

  const onClick = useCallback(() => {
    const newSelectedTags = isTagSelected
      ? selectedCustomizedTags.filter((tag) => tag !== label)
      : [...selectedCustomizedTags, label]
    handleGetWordIds({
      tags: newSelectedTags.length === 0 ? undefined : newSelectedTags,
    })
  }, [label, isTagSelected, selectedCustomizedTags, handleGetWordIds])

  return (
    <StyledTagButtonAtom
      label={`#` + label}
      loading={loading}
      style={{
        variant,
      }}
      onClick={onClick}
    />
  )
}

export default TagButtonCustomized
