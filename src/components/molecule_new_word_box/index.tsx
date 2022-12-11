import { FC } from 'react'
import { Card, Box, CardContent, Typography, CardActions } from '@mui/material'
import StyledTextField from '@/atoms/StyledTextField'
import { useOutsideClicked } from '@/hooks/use-outside-clicked.hook'
import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { useKeyPress } from '@/hooks/use-key-press.hook'
import { usePostWord } from '@/hooks/words/use-post-word.hook'

const NewWordBox: FC = () => {
  const [
    userInput,
    setUserInput,
    isWritingMode,
    setWritingMode,
    handleClickAddWord,
  ] = usePostWord()

  useKeyPress(`Escape`, handleClickAddWord)
  const ref = useOutsideClicked(handleClickAddWord)

  if (isWritingMode) {
    return (
      <Card
        style={{ width: `100%`, borderRadius: 9, cursor: `text` }}
        ref={ref}
      >
        <CardContent>
          <StyledTextField
            value={userInput}
            handleChange={setUserInput}
            placeholder={`Add your new words...`}
            isAutoFocused
          />
        </CardContent>
        <CardActions>
          <Box flexGrow={1} />
          <StyledTextButtonAtom
            handleClick={() => handleClickAddWord()}
            title={`Close`}
          />
        </CardActions>
      </Card>
    )
  }

  return (
    <Card
      style={{ width: `100%`, borderRadius: 9, cursor: `text` }}
      onClick={() => setWritingMode(true)}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Add your new words...
        </Typography>
      </CardContent>
    </Card>
  )
}

export default NewWordBox
