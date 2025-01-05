import { FC } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import StyledDialog from '@/organisms/StyledDialog'
import { DialogTitle } from '@mui/material'
import { fixedTagsState } from '@/recoil/words/words.state'

const FixedTagsDialog: FC = () => {
  const fixedTags = useRecoilValue(fixedTagsState)
  const onClose = useResetRecoilState(fixedTagsState)

  if (fixedTags === null) return null // does not show any dialog as explained in src/recoil/words/words.state.ts

  return (
    <StyledDialog onClose={onClose}>
      <DialogTitle>{`Hello World!`}</DialogTitle>
    </StyledDialog>
  )
}

export default FixedTagsDialog
