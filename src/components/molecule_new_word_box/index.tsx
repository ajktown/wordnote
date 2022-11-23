import { FC, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { WordData } from '@/api/words/words.interface'
import StyledTextField from '@/atoms/StyledTextField.a'

interface Props {
  onClickAddWord: (word: WordData) => void
}
const NewWordBox: FC<Props> = ({ onClickAddWord }) => {
  const [userInput, setUserInput] = useState("")
  const [isWritingMode, setWritingMode] = useState(false)
  // TODO: Write a listener for clicking outside of the this component

  if (isWritingMode) {
    return (
      <Card style={{ width: "100%", borderRadius: 9, cursor: "text" }}
        onClick={() => setWritingMode(true)}
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