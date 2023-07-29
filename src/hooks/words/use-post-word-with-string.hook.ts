import { PostWordReqDto } from '@/api/words/interfaces'
import { parseInputIntoWordLambda } from '@/lambdas/parse-input-into-word.lambda'
import { useCallback, useState, Dispatch, SetStateAction } from 'react'
import { usePostWord } from './use-post-word.hook'

type UsePostWordWithStringHook = [
  string, // userInput
  Dispatch<SetStateAction<string>>, // setUserInput
  boolean, // isWritingMode
  () => void, // handleClickOpenWritingMode
  () => Promise<void>, // handleClickAddWord
]

export const usePostWordWithStringHook = (): UsePostWordWithStringHook => {
  const handlePostWord = usePostWord()
  const [userInput, setUserInput] = useState(``)
  const [isWritingMode, setWritingMode] = useState(false)

  const handleClickOpenWritingMode = useCallback(() => setWritingMode(true), [])

  const handleClickPostWord = useCallback(async () => {
    if (!userInput) return setWritingMode(false)

    try {
      const newWord: PostWordReqDto = parseInputIntoWordLambda(userInput)
      handlePostWord(newWord)
    } catch {}

    setUserInput(``)
    setWritingMode(false)
  }, [userInput, handlePostWord])

  return [
    userInput,
    setUserInput,
    isWritingMode,
    handleClickOpenWritingMode,
    handleClickPostWord,
  ]
}
