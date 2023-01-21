import { SemesterData } from '@/api/semesters/index.interface'
import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { selectedSemesterState } from '@/recoil/semesters.state'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilState } from 'recoil'

interface Props {
  semester: SemesterData
}
const TagButtonSemester: FC<Props> = ({ semester }) => {
  const [selectedSemester, setSelectedSemester] = useRecoilState(
    selectedSemesterState,
  )
  const { code } = semester

  const variant: GlobalMuiTagVariant = useMemo(() => {
    if (selectedSemester === code) return `filled`
    return `outlined`
  }, [selectedSemester, code])

  const onClick = useCallback(() => {
    setSelectedSemester(code)
  }, [code, setSelectedSemester])

  return (
    <StyledTagButtonAtom
      key={semester.code}
      label={`${semester.year}Y ${semester.quarter}Q`}
      onClick={onClick}
      style={{
        variant,
      }}
    />
  )
}

export default TagButtonSemester
