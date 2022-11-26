import { FC, useCallback, useState } from 'react'
import { Card, Box, CardContent, Typography, CardActions } from '@mui/material'
import { WordData } from '@/api/words/words.interface'
import StyledTextField from '@/atoms/StyledTextField.a'
import { useOutsideClicked } from '@/hook/use-outside-clicked.hook'
import StyledTextButtonAtom from '@/atoms/StyledTextButton.a'

interface Props {
  onClickAddWordCallback: (word: WordData) => Promise<void>
}
const NewWordBox: FC<Props> = ({ onClickAddWordCallback }) => {
  const [userInput, setUserInput] = useState(``)
  const [isWritingMode, setWritingMode] = useState(false)

  const handleClickAddWordCallback = useCallback(async () => {
    if (!userInput) return setWritingMode(false)

    await onClickAddWordCallback({
      id: userInput,
      term: userInput,
      pronunciation: ``,
      definition: ``,
      example: ``,
      isFavorite: false,
    })
    setUserInput(``)
    setWritingMode(false)
  }, [userInput])

  const ref = useOutsideClicked(handleClickAddWordCallback)

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
            handleClick={() => handleClickAddWordCallback()}
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
