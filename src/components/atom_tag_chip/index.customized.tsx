import StyledChip from '@/atoms/StyledChip'
import { GlobalMuiTagVariant } from '@/global.interface'
import { useWords } from '@/hooks/words/use-words.hook'
import { selectedCustomizedTagsSelector } from '@/states/words/words.selectors'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

interface Props {
  label: string
  clickDisabled?: boolean
}
const TagChipCustomized: FC<Props> = ({ label, clickDisabled }) => {
  const selectedCustomizedTags = useRecoilValue(selectedCustomizedTagsSelector)
  const [loading, onGetWords] = useWords()

  const isTagSelected = useMemo(
    () => selectedCustomizedTags.includes(label),
    [selectedCustomizedTags, label],
  )

  const variant: GlobalMuiTagVariant = useMemo(() => {
    return isTagSelected ? `filled` : `outlined`
  }, [isTagSelected])

  const onClick = useCallback(async () => {
    const newSelectedTags = isTagSelected
      ? selectedCustomizedTags.filter((tag) => tag !== label)
      : [...selectedCustomizedTags, label]
    try {
      await onGetWords({
        tags: newSelectedTags.length === 0 ? undefined : newSelectedTags,
      })
    } catch {}
  }, [label, isTagSelected, selectedCustomizedTags, onGetWords])

  return (
    <StyledChip
      label={`#` + label}
      loading={loading}
      clickDisabled={clickDisabled}
      style={{
        variant,
      }}
      onClick={onClick}
    />
  )
}

export default TagChipCustomized
