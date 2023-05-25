import { useRecoilCallback } from 'recoil'
import { getSemesterByCodeApi as getSemesterByCodeApi } from '@/api/semesters/get-semester-by-code.api'
import { semesterDetailsFamily } from '@/recoil/words/semesters.state'

export const useSemesterByCode = () => {
  const handleRefresh = useRecoilCallback(
    ({ set }) =>
      async (code: number | undefined) => {
        if (!code) return // TODO: Kind of weird way to write.

        const [semester] = await getSemesterByCodeApi(code)
        set(semesterDetailsFamily(semester.code), semester.details)
      },
    [],
  )

  return handleRefresh
}
