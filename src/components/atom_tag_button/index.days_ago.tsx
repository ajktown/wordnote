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
  const time = DateTime.now().minus({ days: daysAgo + 24 })

  switch (daysAgo) {
    case 0:
    case 1:
    case 4:
      return stringCaseHandler.toSentence(time.toRelativeCalendar() || ``)
    case 7:
    case 14:
    case 21:
      return stringCaseHandler.toSentence(time.toRelativeCalendar({
        unit: "weeks"
      }) || ``)
    case 30:
      return "A month ago"
    case 60:
      return "2 months ago"
    default:
      return stringCaseHandler.toSentence(time.toRelativeCalendar() || ``)
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
