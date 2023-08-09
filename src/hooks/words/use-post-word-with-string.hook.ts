import { PostWordReqDto } from '@/api/words/interfaces'
import { parseInputIntoWordLambda } from '@/lambdas/parse-input-into-word.lambda'
import { useCallback, useState, Dispatch, SetStateAction } from 'react'
import { usePostWord } from './use-post-word.hook'

type UsePostWordWithStringHook = [
  boolean, // loading
  string, // userInput
  Dispatch<SetStateAction<string>>, // setUserInput
  boolean, // isWritingMode
  () => void, // handleClickOpenWritingMode
  () => Promise<void>, // onClickPostWordWritingModeClosed
  () => Promise<void>, // onClickPostWordWritingModeOpen
]

export const usePostWordWithStringHook = (): UsePostWordWithStringHook => {
  const handlePostWord = usePostWord()
  const [userInput, setUserInput] = useState(``)
  const [loading, setLoading] = useState(false)
  const [isWritingMode, setWritingMode] = useState(false)

  const onClickWritingModeOpen = useCallback(() => setWritingMode(true), [])

  const onClickPostWord = useCallback(
    async (withWritingModeClosed: boolean) => {
      if (!userInput) return setWritingMode(false)

      try {
        setLoading(true)
        const newWord: PostWordReqDto = parseInputIntoWordLambda(userInput)
        await handlePostWord(newWord)
      } finally {
        setLoading(false)
      }

      setUserInput(``)
      withWritingModeClosed && setWritingMode(false)
    },
    [userInput, handlePostWord],
  )

  const onClickPostWordWritingModeClose = useCallback(
    () => onClickPostWord(true),
    [onClickPostWord],
  )
  const onClickPostWordWritingModeOpen = useCallback(
    () => onClickPostWord(false),
    [onClickPostWord],
  )

  return [
    loading,
    userInput,
    setUserInput,
    isWritingMode,
    onClickWritingModeOpen,
    onClickPostWordWritingModeClose,
    onClickPostWordWritingModeOpen,
  ]
}
