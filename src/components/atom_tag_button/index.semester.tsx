import { SemesterData } from '@/api/semesters/index.interface'
import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { useSemesterById } from '@/hooks/semesters/use-semster-by-id.hook'
import { useWordIds } from '@/hooks/words/use-word-ids.hook'
import { selectedSemesterState } from '@/recoil/words/words.state'
import { FC, useMemo } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'

interface Props {
  semester: SemesterData
}
const TagButtonSemester: FC<Props> = ({ semester }) => {
  const selectedSemester = useRecoilValue(selectedSemesterState)
  const getSemesterById = useSemesterById()

  const { code } = semester

  const variant: GlobalMuiTagVariant = useMemo(() => {
    if (selectedSemester === code) return `filled`
    return `outlined`
  }, [selectedSemester, code])

  const [loading, handleGetWordIds] = useWordIds()

  const onClick = useRecoilCallback(
    () => async () => {
      const modifyingTo = selectedSemester === code ? undefined : code
      handleGetWordIds({ semester: modifyingTo })
      getSemesterById(modifyingTo?.toString() || null)
    },
    [code, selectedSemester, handleGetWordIds, getSemesterById],
  )

  return (
    <StyledTagButtonAtom
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
