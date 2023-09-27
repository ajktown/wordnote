import { FC } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { isShowingArchivedState } from '@/recoil/preferences/preference.state'
import Switch from '@mui/material/Switch'
import { Typography } from '@mui/material'

/** Simply renders a message that the end user is using archive mode.
 * Else, simply returns null, representing it is using normal mode.
 */
const WordCardsFrameArchiveModePart: FC = () => {
  const isShowingArchived = useRecoilValue(isShowingArchivedState)

  if (!isShowingArchived) return null

  return (
    <Typography style={{
      fontStyle: "italic"
    }}>
      {"Showing Archived Word Cards Only"}
    </Typography>
  )
}

export default WordCardsFrameArchiveModePart
