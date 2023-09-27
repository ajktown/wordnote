import { FC } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { isShowingArchivedState } from '@/recoil/preferences/preference.state'
import Switch from '@mui/material/Switch'

const WordCardsFrameArchiveSwitchPart: FC = () => {
  const isShowingArchived = useRecoilValue(isShowingArchivedState)

  const onChange = useRecoilCallback(({ set }) => (_, checked: boolean) => {
    set(isShowingArchivedState, !checked)
  })

  return (
    <Switch
      checked={!isShowingArchived}
      size="small"
      color="default"
      onChange={onChange}
    />
  )
}

export default WordCardsFrameArchiveSwitchPart
