import { FC, useState } from 'react'
import { useRecoilCallback, useRecoilValue, useResetRecoilState } from 'recoil'
import StyledDialog from '@/organisms/StyledDialog'
import {
  Box,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import {
  isFixedTagsDialogOpenState,
  fixedTagsState,
} from '@/states/words/words.state'
import StyledTextField from '@/atoms/StyledTextField'
import { useKeyPress } from '@/hooks/use-key-press.hook'
import TagButtonChunkFixed from '../molecule_tag_button_chunk/index.fixed'

const FixedTagsDialog: FC = () => {
  const [input, setInput] = useState(``)
  const fixedTagsDialogOpen = useRecoilValue(isFixedTagsDialogOpenState)
  const onClose = useResetRecoilState(isFixedTagsDialogOpenState)

  const onHitEnter = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        const fixedTagSet = new Set(await snapshot.getPromise(fixedTagsState))
        const trimmed = input.trim()
        if (trimmed.length === 0) return

        fixedTagSet.add(trimmed)
        set(fixedTagsState, Array.from(fixedTagSet))
        setInput(``) // input is cleared after adding a tag
      },
    [input, setInput],
  )

  useKeyPress(onHitEnter, `Enter`)

  if (!fixedTagsDialogOpen) return null

  return (
    <StyledDialog onClose={onClose}>
      <DialogTitle>
        {`Add Fixed Tags`}
        <DialogContentText variant="caption">
          {`"Fixed Tags” is a feature that automatically adds predefined tags to any new words you create, eliminating the need to manually add tags to each word individually if fixed tags are not set.`}
        </DialogContentText>
      </DialogTitle>
      <DialogContent>
        <StyledTextField
          value={input}
          onChange={setInput}
          label={`Insert your Fixed Tags here`}
        />
        <Box pb={1} />
        <TagButtonChunkFixed />
      </DialogContent>
    </StyledDialog>
  )
}

export default FixedTagsDialog
