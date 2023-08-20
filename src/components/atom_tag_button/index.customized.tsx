import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { useWords } from '@/hooks/words/use-words.hook'
import { selectedCustomizedTagsSelector } from '@/recoil/words/words.selectors'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

interface Props {
  label: string
}
const TagButtonCustomized: FC<Props> = ({ label }) => {
  const selectedCustomizedTags = useRecoilValue(selectedCustomizedTagsSelector)
  const [loading, getWords] = useWords()

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
      await getWords({
        tags: newSelectedTags.length === 0 ? undefined : newSelectedTags,
      })
    } catch {}
  }, [label, isTagSelected, selectedCustomizedTags, getWords])

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
