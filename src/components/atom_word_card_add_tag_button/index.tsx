import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import StyledChip from '@/atoms/StyledChip'
import StyledTextField from '@/atoms/StyledTextField'
import { FC, Fragment, useCallback, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import StyledDialog from '@/organisms/StyledDialog'
import { DialogContent, DialogTitle } from '@mui/material'
import { useDynamicFocus } from '@/hooks/use-dynamic-focus.hook'
import { usePutWordTagAdded } from '@/hooks/words/use-put-word-tag-added.hook'
import { useKeyPress } from '@/hooks/use-key-press.hook'

interface Props {
  wordId: string
}
const WordCardAddTagButton: FC<Props> = ({ wordId }) => {
  const [isAddingMode, setAddingMode] = useState(false)
  const [input, setInput] = useState(``)

  const onClickOpen = useCallback(async () => setAddingMode(true), [])
  const [inputRef, onDynamicFocus] = useDynamicFocus(onClickOpen)
  const onResetInput = useCallback(() => {
    setInput(``)
    setAddingMode(false)
  }, [])
  const [loading, onPutWordTagAdded] = usePutWordTagAdded(wordId, onResetInput)
  const onClick = useCallback(
    () => onPutWordTagAdded(input),
    [input, onPutWordTagAdded],
  )
  useKeyPress(onClick, `Meta`, `Enter`) // for mac
  useKeyPress(onClick, `Control`, `Enter`) // for windows

  return (
    <Fragment>
      <StyledChip label={`+`} loading={loading} onClick={onDynamicFocus} />
      {isAddingMode && (
        <StyledDialog
          visuals={{ maxWidth: `xs` }}
          onClose={loading ? undefined : onResetInput}
        >
          <DialogTitle>{`Insert your new tag name`}</DialogTitle>
          <DialogContent>
            <StyledTextField
              value={input}
              onChange={setInput}
              ref={inputRef}
              isAutoFocused
              buttons={{
                right: (
                  <StyledIconButtonAtom
                    jsxElementButton={<CheckIcon fontSize="small" />}
                    onClick={onClick}
                    isDisabled={loading || input.length === 0}
                  />
                ),
              }}
            />
          </DialogContent>
        </StyledDialog>
      )}
    </Fragment>
  )
}

export default WordCardAddTagButton
