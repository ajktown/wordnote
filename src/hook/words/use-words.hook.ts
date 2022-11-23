import { useCallback, useEffect, useState, Dispatch, SetStateAction } from "react"
import { getWordsApi } from "../../api/words/get-words.api"
import { WordData } from "../../api/words/words.interface"
import { HandleClickRefresh, useInternalLoading } from "../use-internal-loading.hook"

type UseWordsData =
  | WordData[]
  | undefined

type UseWords = [
  UseWordsData,
  Dispatch<SetStateAction<UseWordsData>>,
  HandleClickRefresh
]

export const useWords = (): UseWords => {
  const [words, setWords] = useState<UseWordsData>()
  const [internalLoading, handleClickRefresh] = useInternalLoading()

  const callApi = useCallback(async () => {
    try {
      setWords(await getWordsApi())
    } catch {
      setWords([])
    }
  }, [])

  useEffect(() => {
    setWords(undefined) // loading
    callApi() // run
  }, [callApi, internalLoading])

  return [words, setWords, handleClickRefresh]
}