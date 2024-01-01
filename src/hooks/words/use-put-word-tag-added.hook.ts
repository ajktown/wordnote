import { useState } from 'react'
import { useRecoilCallback } from 'recoil'
import { wordsFamily } from '@/recoil/words/words.state'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import { semesterDetailsFamily } from '@/recoil/words/semesters.state'

type UsePutWordTagAdded = [
  boolean, // loading
  (newTagName: string) => Promise<void>, // onChange
]
export const usePutWordTagAdded = (
  wordId: string,
  callback?: () => any,
): UsePutWordTagAdded => {
  const [loading, setLoading] = useState(false)
  const [, onPutWord] = usePutWord(wordId)

  const onChange = useRecoilCallback(
    ({ snapshot, set }) =>
      async (newTagName: string) => {
        try {
          setLoading(true)

          const wordData = await snapshot.getPromise(wordsFamily(wordId))
          if (!wordData) throw new Error(`Word not found`)

          const tagSet = new Set(wordData.tags)
          tagSet.add(newTagName)
          await onPutWord({ tags: Array.from(tagSet) })

          // Add the newly created tag to the semester details
          const semesterDetails = await snapshot.getPromise(
            semesterDetailsFamily(wordData.semester),
          )
          if (semesterDetails) {
            set(semesterDetailsFamily(wordData.semester), {
              ...semesterDetails,
              tags: Array.from(new Set([...semesterDetails.tags, newTagName])),
            })
          }

          if (callback) callback()
        } finally {
          setLoading(false)
        }
      },
    [onPutWord, callback],
  )

  return [loading, onChange]
}
