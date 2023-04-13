import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { useWordIds } from '@/hooks/words/use-word-ids.hook'
import { selectedSemesterSelector } from '@/recoil/words/tags.selectors'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

const TagButtonAllSemesters: FC = () => {
  const selectedSemester = useRecoilValue(selectedSemesterSelector)
  const variant: GlobalMuiTagVariant = useMemo(
    () => (selectedSemester === undefined ? `filled` : `outlined`),
    [selectedSemester],
  )

  const [loading, handleGetWordIds] = useWordIds()
  const onClick = useCallback(() => {
    handleGetWordIds({ semester: undefined })
  }, [handleGetWordIds])

  return (
    <StyledTagButtonAtom
      label={`⭐️ All`}
      onClick={onClick}
      loading={loading}
      style={{
        variant,
      }}
    />
  )
}

export default TagButtonAllSemesters
