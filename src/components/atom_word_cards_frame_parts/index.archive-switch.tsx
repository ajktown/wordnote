import { FC } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { isShowingArchivedState } from '@/states/preferences/preference.state'
import StyledSwitch from '@/atoms/StyledSwitch'

const WordCardsFrameArchiveSwitchPart: FC = () => {
  const isShowingArchived = useRecoilValue(isShowingArchivedState)

  const onChange = useRecoilCallback(({ set }) => (_, checked: boolean) => {
    set(isShowingArchivedState, !checked)
  })

  return (
    <StyledSwitch
      tooltipProps={{
        title: isShowingArchived
          ? `Hide archived words`
          : `Show archived words`,
      }}
      switchProps={{
        checked: !isShowingArchived,
        onChange,
      }}
    />
  )
}

export default WordCardsFrameArchiveSwitchPart
