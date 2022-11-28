import { FC, useState } from 'react'
import { Card, Box, CardContent, Typography, CardActions } from '@mui/material'
import { WordData } from '@/api/words/words.interface'
import StyledTextField from '@/atoms/StyledTextField'
import { useOutsideClicked } from '@/hook/use-outside-clicked.hook'
import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { useRecoilState } from 'recoil'
import { deprecatedWordsState } from '@/recoils/state_atoms/words.state'
import { postWordApi } from '@/api/words/post-word.api'

const NewWordBox: FC = () => {
  const [words, setWords] = useRecoilState(deprecatedWordsState)
  const [userInput, setUserInput] = useState(``)
  const [isWritingMode, setWritingMode] = useState(false)

  const handleClickAddWord = async () => {
    if (!userInput) return setWritingMode(false)

    try {
      const newWord: WordData = {
        id: userInput,
        term: userInput,
        pronunciation: ``,
        definition: ``,
        example: ``,
        isFavorite: false,
      }
      await postWordApi(newWord)
      setWords(words.length > 0 ? [newWord, ...words] : [newWord])
    } catch {}

    setUserInput(``)
    setWritingMode(false)
  }

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
