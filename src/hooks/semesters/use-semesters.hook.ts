import {
  GetSemestersResDTO,
  getSemestersApi,
} from '@/api/semesters/get-semesters.api'
import { semestersState } from '@/recoil/words/semesters.state'
import { useRecoilCallback } from 'recoil'

type HandleRefresh = () => Promise<GetSemestersResDTO>
export const useSemesters = () => {
  const onSemesters: HandleRefresh = useRecoilCallback(
    ({ set, reset }) =>
      async () => {
        try {
          const [semesters] = await getSemestersApi()
          set(semestersState, semesters.semesters)
          return semesters
        } catch {
          reset(semestersState)
          return {
            latestSemesterCode: undefined,
            semesters: [],
          }
        }
      },
    [],
  )

  return onSemesters
}
