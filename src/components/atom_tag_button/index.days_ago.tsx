import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { GlobalMuiTagVariant } from '@/global.interface'
import { DateTime } from 'luxon'
import { stringCaseHandler } from '@/handlers/string-case.handler'
import { selectedDaysAgoTagsSelector } from '@/recoil/words/tags.selectors'
import { useWords } from '@/hooks/words/use-words.hook'
interface Props {
  daysAgo: number
}

const getLabel = (daysAgo: number): string => {
  // TODO: Use Luxon later when the user preference can be modified.
  switch (daysAgo) {
    case 0:
      return `Today`
    case 1:
      return `Yesterday`
    case 4:
      return `4 days ago`
    case 7:
      return `1 week ago`
    case 14:
      return `2 weeks ago`
    case 21:
      return `3 weeks ago`
    case 30:
      return `1 month ago`
    case 60:
      return `2 months ago`
    default:
      return stringCaseHandler.toSentence(
        DateTime.now().minus({ days: daysAgo }).toRelativeCalendar() ||
          `Unknown`,
      )
  }
}

const TagButtonDaysAgo: FC<Props> = ({ daysAgo }) => {
  const selectedDaysAgo = useRecoilValue(selectedDaysAgoTagsSelector)
  const [loading, handleGetWordIds] = useWords()

  const onClick = useCallback(() => {
    handleGetWordIds({
      daysAgo: daysAgo === selectedDaysAgo ? undefined : daysAgo,
    })
  }, [daysAgo, selectedDaysAgo, handleGetWordIds])

  const variant: GlobalMuiTagVariant = useMemo(
    () => (selectedDaysAgo === daysAgo ? `filled` : `outlined`),
    [selectedDaysAgo, daysAgo],
  )

  return (
    <StyledTagButtonAtom
      label={`🌀 ` + getLabel(daysAgo)}
      loading={loading}
      style={{
        variant,
      }}
      onClick={onClick}
    />
  )
}

export default TagButtonDaysAgo
