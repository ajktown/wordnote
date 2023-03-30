import StyledTagButtonAtom from '@/atoms/StyledTagButton'
import { GlobalMuiTagVariant } from '@/global.interface'
import { useWordIds } from '@/hooks/words/use-word-ids.hook'
import { selectedSemesterState } from '@/recoil/words/words.state'
import { FC, useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

const TagButtonAllSemesters: FC = () => {
  const selectedSemester = useRecoilValue(selectedSemesterState)
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
