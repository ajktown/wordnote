import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { selectedCreatedDayState } from '@/recoil/created-date-tags.state'
import { GlobalMuiTagVariant } from '@/global.interface'
import { DateTime } from 'luxon'
import { stringCaseHandler } from '@/handlers/string-case.handler'
interface Props {
  daysAgo: number
}

const getLabel = (daysAgo: number) => {
  const time = DateTime.now().minus({ days: daysAgo })
  
  switch (daysAgo) {
    case 0:
    case 1:
      return stringCaseHandler.toSentence(time.toRelativeCalendar() || "")
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
      return `Unknown`
  }
}

const TagButtonDaysAgo: FC<Props> = ({ daysAgo }) => {
  const [selectedCreatedDay, setSelectedCreatedDay] = useRecoilState(
    selectedCreatedDayState,
  )
  const resetSelectedCreatedDay = useResetRecoilState(selectedCreatedDayState)

  const variant: GlobalMuiTagVariant = useMemo(
    () => (selectedCreatedDay === daysAgo ? `filled` : `outlined`),
    [selectedCreatedDay, daysAgo],
  )

  const onClick = useCallback(() => {
    if (daysAgo === selectedCreatedDay) return resetSelectedCreatedDay()
    setSelectedCreatedDay(daysAgo)
  }, [
    daysAgo,
    selectedCreatedDay,
    setSelectedCreatedDay,
    resetSelectedCreatedDay,
  ])

  return (
    <StyledTagButtonAtom
      label={`🌀 ` + getLabel(daysAgo)}
      style={{
        variant,
      }}
      onClick={onClick}
    />
  )
}

export default TagButtonDaysAgo
