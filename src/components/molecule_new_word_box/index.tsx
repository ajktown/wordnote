import { FC, useCallback, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { WordData } from '@/api/words/words.interface'
import StyledTextField from '@/atoms/StyledTextField.a'
import { useOutsideClicked } from '@/hook/use-outside-clicked.hook'

interface Props {
  onClickAddWordCallback: (word: WordData) => Promise<void>
}
const NewWordBox: FC<Props> = ({ onClickAddWordCallback }) => {
  const [userInput, setUserInput] = useState("")
  const [isWritingMode, setWritingMode] = useState(false)

  const handleClickAddWordCallback = useCallback(async () => {
    await onClickAddWordCallback({
      id: userInput,
      term: userInput,
      pronunciation: "",
      definition: "",
      example: "",

    })
    setUserInput("")
    setWritingMode(false)
  }, [userInput])

  const ref = useOutsideClicked(handleClickAddWordCallback);

  if (isWritingMode) {
    return (
      <Card style={{ width: "100%", borderRadius: 9, cursor: "text" }}
        onClick={() => setWritingMode(true)}
        ref={ref}
      >
        <CardContent>
          <StyledTextField value={userInput} handleChange={setUserInput}
            placeholder={"Add your new words..."}
            isAutoFocused
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card style={{ width: "100%", borderRadius: 9, cursor: "text" }}
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