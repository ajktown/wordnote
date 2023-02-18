import { SemesterData } from '@/api/semesters/index.interface'
import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { useResetSelectedChips } from '@/hooks/use-reset-selected-chips.hook'
import { selectedSemesterState } from '@/recoil/semesters.state'
import { FC, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

interface Props {
  semester: SemesterData
}
const TagButtonSemester: FC<Props> = ({ semester }) => {
  const selectedSemester = useRecoilValue(selectedSemesterState)

  const { code } = semester
  const handleClickResetSelectedChips = useResetSelectedChips(code)

  const variant: GlobalMuiTagVariant = useMemo(() => {
    if (selectedSemester === code) return `filled`
    return `outlined`
  }, [selectedSemester, code])

  return (
    <StyledTagButtonAtom
      key={code}
      label={`${semester.year}Y ${semester.quarter}Q`}
      onClick={handleClickResetSelectedChips}
      style={{
        variant,
      }}
    />
  )
}

export default TagButtonSemester
