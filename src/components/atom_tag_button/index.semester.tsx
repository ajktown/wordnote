import { ISemester } from '@/api/semesters/index.interface'
import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { useWordIds } from '@/hooks/words/use-word-ids.hook'
import { selectedSemesterSelector } from '@/recoil/words/tags.selectors'
import { FC, useMemo } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'

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

  const [loading, handleGetWordIds] = useWordIds()

  const onClick = useRecoilCallback(
    () => async () => {
      if (selectedSemester === code) return // already selected
      await handleGetWordIds({ semester: code })
    },
    [code, selectedSemester, handleGetWordIds],
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
