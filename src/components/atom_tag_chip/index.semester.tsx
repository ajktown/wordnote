import { ISemester } from '@/api/semesters/index.interface'
import StyledChip from '@/atoms/StyledChip'
import { GlobalMuiTagVariant } from '@/global.interface'
import { useSemesterClick } from '@/hooks/semesters/use-semester-click.hook'
import { selectedSemesterSelector } from '@/recoil/words/words.selectors'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

interface Props {
  semester: ISemester
}
const TagButtonSemester: FC<Props> = ({ semester }) => {
  const selectedSemester = useRecoilValue(selectedSemesterSelector)

  const { code } = semester

  const variant: GlobalMuiTagVariant = useMemo(() => {
    if (selectedSemester === code) return `filled`
    return `outlined`
  }, [selectedSemester, code])

  const [loading, onSemesterClick] = useSemesterClick()
  const onClick = useCallback(async () => {
    if (code === selectedSemester) return // already selected
    await onSemesterClick(code)
  }, [selectedSemester, code, onSemesterClick])

  return (
    <StyledChip
      key={code}
      loading={loading}
      label={`${semester.year}Y ${semester.quarter}Q`}
      onClick={onClick}
      style={{
        variant,
      }}
    />
  )
}

export default TagButtonSemester
