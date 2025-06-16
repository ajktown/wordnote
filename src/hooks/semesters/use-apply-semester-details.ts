import { GetWordIdsApi } from '@/api/words/get-word-ids.api'
import { GetWordsApi } from '@/api/words/get-words.api'
import { semesterDetailsFamily } from '@/states/words/semesters.state'
import { useRecoilCallback } from 'recoil'

type HandleApplySemester = (res: GetWordIdsApi | GetWordsApi) => void

export const useApplySemesterDetails = () => {
  const onApplySemesterDetails: HandleApplySemester = useRecoilCallback(
    ({ set }) =>
      (res) => {
        if (!res.semester) return // nothing to apply
        if (!res.semester.details) return // nothing to apply
        set(semesterDetailsFamily(res.semester.code), res.semester.details)
      },
    [],
  )

  return onApplySemesterDetails
}
