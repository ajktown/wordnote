import { getSemestersApi } from '@/api/semesters/get-semesters.api'
import { semestersState } from '@/recoil/words/semesters.state'
import { useRecoilCallback } from 'recoil'

export const useSemesters = () => {
  const handleRefresh = useRecoilCallback(
    ({ set, reset }) =>
      async () => {
        try {
          const [semesters] = await getSemestersApi()
          set(semestersState, semesters.semesters)
        } catch {
          reset(semestersState)
        }
      },
    [],
  )

  return handleRefresh
}
