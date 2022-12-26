import { WordData } from '@/api/words/words.interface'
import { getRandomHexHandler } from '@/handlers/get-random-hex.handler'
import { useCallback, useState, Dispatch, SetStateAction } from 'react'
import { usePostWord } from './use-post-word.hook'

type UsePostWordWithStringHook = [
  string, // userInput
  Dispatch<SetStateAction<string>>, // setUserInput
  boolean, // isWritingMode
  Dispatch<SetStateAction<boolean>>, // setWritingMode
  () => Promise<void>, // handleClickAddWord
]

export const usePostWordWithStringHook = (): UsePostWordWithStringHook => {
  const handlePostWord = usePostWord()
  const [userInput, setUserInput] = useState(``)
  const [isWritingMode, setWritingMode] = useState(false)

  const handleClickPostWord = useCallback(async () => {
    if (!userInput) return setWritingMode(false)

    // TODO: Will put a logic with handlers and and its test
    try {
      const newWord: WordData = {
        id: userInput + getRandomHexHandler(),
        term: userInput,
        pronunciation: ``,
        definition: ``,
        example: ``,
        isFavorite: false,
      }
      handlePostWord(newWord)
    } catch {}

    setUserInput(``)
    setWritingMode(false)
  }, [userInput, handlePostWord])

  return [
    userInput,
    setUserInput,
    isWritingMode,
    setWritingMode,
    handleClickPostWord,
  ]
}
