import { useRecoilCallback } from 'recoil'
import { getSemesterByIdApi } from '@/api/semesters/get-semester-by-id.api'
import { semesterDetailFamily } from '@/recoil/words/semesters.state'

export const useSemesterById = () => {
  const handleRefresh = useRecoilCallback(
    ({ set }) =>
      async (id: string | null) => {
        if (id === null) return // TODO: Kind of weird way to write.

        const [semester] = await getSemesterByIdApi(id)
        set(semesterDetailFamily(semester.id), semester.details)
      },
    [],
  )

  return handleRefresh
}
