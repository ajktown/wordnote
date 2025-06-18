import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { isShowingArchivedState } from '@/states/preferences/preference.state'
import { Typography } from '@mui/material'

/** Simply renders a message that the end user is using archive mode.
 * Else, simply returns null, representing it is using normal mode.
 */
const WordCardsFrameArchiveModePart: FC = () => {
  const isShowingArchived = useRecoilValue(isShowingArchivedState)

  if (!isShowingArchived) return null

  return (
    <Typography
      style={{
        fontStyle: `italic`,
      }}
    >
      {`Showing Archived Word Cards Only`}
    </Typography>
  )
}

export default WordCardsFrameArchiveModePart
