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
} from '@/recoil/words/words.state'
import TagChipDeletable from '../atom_tag_chip/index.deletable'
import StyledTextField from '@/atoms/StyledTextField'
import { useKeyPress } from '@/hooks/use-key-press.hook'

const FixedTagsDialog: FC = () => {
  const [input, setInput] = useState(``)
  const fixedTagsDialogOpen = useRecoilValue(isFixedTagsDialogOpenState)
  const fixedTags = useRecoilValue(fixedTagsState)
  const onClose = useResetRecoilState(isFixedTagsDialogOpenState)

  const onHitEnter = useRecoilCallback(
    ({ set }) =>
      async () => {
        const fixedTagSet = new Set(fixedTags)
        const trimmed = input.trim()
        if (trimmed.length === 0) return

        fixedTagSet.add(trimmed)
        set(fixedTagsState, Array.from(fixedTagSet))
        setInput(``) // input is cleared after adding a tag
      },
    [input, fixedTags, setInput],
  )

  useKeyPress(onHitEnter, `Enter`)

  const onClickDelete = useRecoilCallback(
    ({ set }) =>
      async (label: string) => {
        const fixedTagSet = new Set(fixedTags)
        fixedTagSet.delete(label)
        set(fixedTagsState, Array.from(fixedTagSet))
      },
    [fixedTags],
  )

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
        {fixedTags.map((tag) => (
          <TagChipDeletable key={tag} label={tag} onClick={onClickDelete} />
        ))}
      </DialogContent>
    </StyledDialog>
  )
}

export default FixedTagsDialog
