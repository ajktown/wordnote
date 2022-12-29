import { FC, useCallback } from 'react'
import { Card, Box, CardContent, Typography, CardActions } from '@mui/material'
import StyledTextField from '@/atoms/StyledTextField'
import { useOutsideClicked } from '@/hooks/use-outside-clicked.hook'
import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { useKeyPress } from '@/hooks/use-key-press.hook'
import { usePostWordWithStringHook } from '@/hooks/words/use-post-word-with-string.hook'

const PRIVATE_FINAL_ADD_NEW_WORD_MESSAGE = `Add your new words...`

const NewWordBox: FC = () => {
  // TODO: This is possibly too long. I think it could be better,
  // TODO: But then for the current code status sake, it looks good.
  const [
    userInput,
    setUserInput,
    isWritingMode,
    setWritingMode,
    handleClickAddWord,
  ] = usePostWordWithStringHook()

  useKeyPress(`Escape`, handleClickAddWord)
  const ref = useOutsideClicked(handleClickAddWord)

  const handleClickCard = useCallback(() => setWritingMode(true), [setWritingMode])

  if (isWritingMode) {
    return (
      <Card
        style={{ width: `100%`, borderRadius: 9, cursor: `text` }}
        ref={ref}
      >
        <CardContent>
          <StyledTextField
            value={userInput}
            onChange={setUserInput}
            placeholder={{ 
              message: PRIVATE_FINAL_ADD_NEW_WORD_MESSAGE,
              hideLabelWithInput: true,
            }}
            isAutoFocused
          />
        </CardContent>
        <CardActions>
          <Box flexGrow={1} />
          <StyledTextButtonAtom onClick={handleClickAddWord} title={`Close`} />
        </CardActions>
      </Card>
    )
  }

  return (
    <Card
      style={{ width: `100%`, borderRadius: 9, cursor: `text` }}
      onClick={handleClickCard}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {PRIVATE_FINAL_ADD_NEW_WORD_MESSAGE}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default NewWordBox
