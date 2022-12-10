import { FC, useCallback, useState } from 'react'
import { Card, Box, CardContent, Typography, CardActions } from '@mui/material'
import { WordData } from '@/api/words/words.interface'
import StyledTextField from '@/atoms/StyledTextField'
import { useOutsideClicked } from '@/hook/use-outside-clicked.hook'
import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { postWordApi } from '@/api/words/post-word.api'
import { getRandomHexHandler } from '@/handlers/get-random-hex.handler'
import { useRecoilCallback, useRecoilState } from 'recoil'
import { wordIdsState, wordsFamily } from '@/recoil/words.state'
import { useKeyPress } from '@/hook/use-key-press.hook'

const NewWordBox: FC = () => {
  const [userInput, setUserInput] = useState(``)
  const [isWritingMode, setWritingMode] = useState(false)
  const [wordIds, setWordIds] = useRecoilState(wordIdsState)

  const setWord = useRecoilCallback(
    ({ set }) =>
      async (wordData: WordData) => {
        // TODO: Refactor this and leave it out of this component "NewWordBox"
        set(wordsFamily(wordData.id), wordData)
      },
    [],
  )

  const handleClickAddWord = useCallback(async () => {
    if (!userInput) return setWritingMode(false)

    // TODO: Has the problem of rendering all data when inserted.
    // TODO: Refactor this and leave it out of this component "NewWordBox"

    try {
      const newWord: WordData = {
        id: userInput + getRandomHexHandler(),
        term: userInput,
        pronunciation: ``,
        definition: ``,
        example: ``,
        isFavorite: false,
      }
      const postedWord = await postWordApi(newWord)

      // Applying on the view side
      setWord(postedWord)
      setWordIds([postedWord.id, ...wordIds])
    } catch {}

    setUserInput(``)
    setWritingMode(false)
  }, [userInput, setWord, setWordIds])

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
