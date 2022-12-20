import { postWordApi } from '@/api/words/post-word.api'
import { WordData } from '@/api/words/words.interface'
import { getRandomHexHandler } from '@/handlers/get-random-hex.handler'
import { wordIdsState, wordsFamily } from '@/recoil/words.state'
import { useCallback, useState, Dispatch, SetStateAction } from 'react'
import { useRecoilCallback, useRecoilState } from 'recoil'

type UsePostWord = [
  string, // userInput
  Dispatch<SetStateAction<string>>, // setUserInput
  boolean, // isWritingMode
  Dispatch<SetStateAction<boolean>>, // setWritingMode
  () => Promise<void>, // handleClickAddWord
]

// TODO: There should be a specific hook that saves object as a word post
// TODO: And the calculation must be done, if needed, in a separate hook!
export const usePostWord = (): UsePostWord => {
  const [userInput, setUserInput] = useState(``)
  const [isWritingMode, setWritingMode] = useState(false)
  const [wordIds, setWordIds] = useRecoilState(wordIdsState)

  // TODO: These callbacks are required to be refactored as the other hooks. Looks a bit old and not studied enough
  const setWord = useRecoilCallback(
    ({ set }) =>
      async (wordData: WordData) => {
        set(wordsFamily(wordData.id), wordData)
      },
    [],
  )

  const handleClickAddWord = useCallback(async () => {
    if (!userInput) return setWritingMode(false)

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
  }, [wordIds, userInput, setWord, setWordIds])

  return [
    userInput,
    setUserInput,
    isWritingMode,
    setWritingMode,
    handleClickAddWord,
  ]
}
