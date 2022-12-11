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

export const usePostWord = (): UsePostWord => {
  const [userInput, setUserInput] = useState(``)
  const [isWritingMode, setWritingMode] = useState(false)
  const [wordIds, setWordIds] = useRecoilState(wordIdsState)

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
  }, [userInput, setWord, setWordIds])

  return [
    userInput,
    setUserInput,
    isWritingMode,
    setWritingMode,
    handleClickAddWord,
  ]
}
