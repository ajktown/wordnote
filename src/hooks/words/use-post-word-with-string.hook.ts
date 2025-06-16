import { PostWordReqDto } from '@/api/words/interfaces'
import { parseInputIntoWordLambda } from '@/lambdas/parse-input-into-word.lambda'
import { useCallback, useState, Dispatch, SetStateAction } from 'react'
import { usePostWord } from './use-post-word.hook'
import { useRecoilCallback } from 'recoil'
import { fixedTagsState } from '@/states/words/words.state'

type UsePostWordWithStringHook = [
  boolean, // loading
  string, // userInput
  Dispatch<SetStateAction<string>>, // setUserInput
  boolean, // isWritingMode
  (flag: boolean) => void, // setWritingMode
  () => void, // onClickWritingModeOpen
  () => Promise<void>, // onClickPostWordWritingModeClosed
  () => Promise<void>, // onClickPostWordWritingModeOpen
]

export const usePostWordWithStringHook = (): UsePostWordWithStringHook => {
  const [, onPostWord] = usePostWord()
  const [userInput, setUserInput] = useState(``)
  const [loading, setLoading] = useState(false)
  const [isWritingMode, setWritingMode] = useState(false)

  const onClickWritingModeOpen = useCallback(() => setWritingMode(true), [])

  const onClickPostWord = useRecoilCallback(
    ({ snapshot }) =>
      async (withWritingModeClosed: boolean) => {
        if (!userInput) return setWritingMode(false)

        try {
          setLoading(true)
          const newWord: PostWordReqDto = parseInputIntoWordLambda(userInput)

          const fixedTagSet = new Set(await snapshot.getPromise(fixedTagsState))
          newWord.tags.forEach((tag) => fixedTagSet.add(tag)) // add tags to fixedTagsState (learn about in src/recoil/words/words.state.ts)
          await onPostWord({
            ...newWord,
            tags: Array.from(fixedTagSet),
          })
        } finally {
          setLoading(false)
        }

        setUserInput(``)
        withWritingModeClosed && setWritingMode(false)
      },
    [userInput, onPostWord],
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
    setWritingMode,
    onClickWritingModeOpen,
    onClickPostWordWritingModeClose,
    onClickPostWordWritingModeOpen,
  ]
}
