import { semestersState } from '@/recoil/words/semesters.state'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { selectedSemesterSelector } from '@/recoil/words/tags.selectors'

const ChooseSemester: FC = () => {
  const semesters = useRecoilValue(semestersState)
  const selectedSemester = useRecoilValue(selectedSemesterSelector)

  if (!semesters || semesters.length === 0) return null
  if (selectedSemester) return null
  return <div>ChooseSemester</div>
}

export default ChooseSemester
